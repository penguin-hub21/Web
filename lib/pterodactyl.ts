const PTERO_URL = process.env.PTERODACTYL_URL || "https://control.lumennodes.in";
const PTERO_API_KEY = process.env.PTERODACTYL_API_KEY || "";

interface PteroResponse<T = unknown> {
  object: string;
  data: T;
  attributes?: T;
}

async function pteroFetch<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${PTERO_URL}/api/application${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${PTERO_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Referer": PTERO_URL,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Pterodactyl API error [${res.status}]: ${errorBody}`);
    throw new Error(`Pterodactyl API error: ${res.status}`);
  }

  return res.json();
}

// Create a user on Pterodactyl
export async function createPteroUser(email: string, name: string) {
  const username = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "") + Math.random().toString(36).slice(2, 6);
  const data = await pteroFetch<PteroResponse>("/users", {
    method: "POST",
    body: JSON.stringify({
      email,
      username,
      first_name: name || "User",
      last_name: "LumenNodes",
    }),
  });
  return data;
}

// Create a server on Pterodactyl
export async function createPteroServer(params: {
  name: string;
  userId: number;
  nestId: number;
  eggId: number;
  ram: number;      // MB
  cpu: number;       // percentage
  disk: number;      // MB
  location?: number;
}) {
  const { name, userId, nestId, eggId, ram, cpu, disk, location = 1 } = params;

  // First get egg details to know default startup/env
  const eggData = await pteroFetch<any>(`/nests/${nestId}/eggs/${eggId}?include=variables`);
  const eggAttrs = eggData.attributes || eggData;

  // Build environment variables from egg defaults
  const environment: Record<string, string> = {};
  const relationships = eggAttrs.relationships?.variables?.data || [];
  for (const v of relationships) {
    const attrs = v.attributes || v;
    environment[attrs.env_variable] = attrs.default_value || "";
  }

  const data = await pteroFetch<PteroResponse>("/servers", {
    method: "POST",
    body: JSON.stringify({
      name,
      user: userId,
      egg: eggId,
      docker_image: eggAttrs.docker_image || "ghcr.io/pterodactyl/yolks:java_17",
      startup: eggAttrs.startup || "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar server.jar",
      environment,
      limits: {
        memory: ram,
        swap: 0,
        disk,
        io: 500,
        cpu,
      },
      feature_limits: {
        databases: 1,
        backups: 2,
        allocations: 1,
      },
      deploy: {
        locations: [location],
        dedicated_ip: false,
        port_range: [],
      },
    }),
  });

  return data;
}

// Get server details
export async function getPteroServer(serverId: number) {
  return pteroFetch<any>(`/servers/${serverId}?include=allocations`);
}

// List all nests
export async function listNests() {
  return pteroFetch<any>("/nests");
}

// List eggs in a nest
export async function listEggs(nestId: number) {
  return pteroFetch<any>(`/nests/${nestId}/eggs`);
}

// Get user by external ID / email
export async function getPteroUserByEmail(email: string) {
  try {
    const data = await pteroFetch<any>(`/users?filter[email]=${encodeURIComponent(email)}`);
    const users = data.data || [];
    return users.length > 0 ? users[0] : null;
  } catch {
    return null;
  }
}

// Suspend / Unsuspend server
export async function suspendPteroServer(serverId: number) {
  return pteroFetch(`/servers/${serverId}/suspend`, { method: "POST" });
}

export async function unsuspendPteroServer(serverId: number) {
  return pteroFetch(`/servers/${serverId}/unsuspend`, { method: "POST" });
}

// Delete server
export async function deletePteroServer(serverId: number) {
  return pteroFetch(`/servers/${serverId}`, { method: "DELETE" });
}
