import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, History } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col pt-16">
      <Navbar />
      
      <main className="flex-grow">
        <Section className="bg-muted/10">
          <Container className="text-center">
            <h1 className="text-4xl font-bold font-heading mb-4">About LumenNode</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We are a team of passionate gamers and engineers dedicated to providing the best hosting experience possible.
            </p>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold font-heading mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  To democratize high-performance hosting by making enterprise-grade hardware accessible to everyone. We believe that whether you're running a small Minecraft server for friends or a large-scale application, you deserve the best performance.
                </p>
                <div className="flex items-start space-x-4 mt-8">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Performance First</h3>
                    <p className="text-sm text-muted-foreground">We never compromise on hardware quality.</p>
                  </div>
                </div>
                 <div className="flex items-start space-x-4 mt-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Community Focused</h3>
                    <p className="text-sm text-muted-foreground">Built by the community, for the community.</p>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-border">
                <div className="text-center p-8">
                    <History className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">Image Placeholder: Team/Office</p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="bg-muted/20">
             <Container>
                <h2 className="text-3xl font-bold font-heading text-center mb-12">Meet the Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="text-center hover:border-primary/50 transition-colors">
                            <CardContent className="pt-6">
                                <div className="h-24 w-24 rounded-full bg-secondary mx-auto mb-4 border-2 border-primary"></div>
                                <h3 className="font-bold text-lg">Team Member {i}</h3>
                                <p className="text-sm text-muted-foreground">Role/Position</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
             </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
