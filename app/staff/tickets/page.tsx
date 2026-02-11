"use client";

import { Container } from "@/components/layout/container";
import { MessageSquare } from "lucide-react";

export default function StaffTicketsPage() {
  return (
    <Container className="py-20 text-center">
      <MessageSquare className="h-16 w-16 mx-auto mb-6 text-neutral-600" />
      <h1 className="text-3xl font-bold text-white mb-4">Support Tickets</h1>
      <p className="text-neutral-400">
        The ticketing system is currently under development. <br />
        Please manage support via Discord for now.
      </p>
    </Container>
  );
}
