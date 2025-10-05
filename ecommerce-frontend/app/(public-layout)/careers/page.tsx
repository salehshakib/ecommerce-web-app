import { MapPin, Calendar, Clock, Users, Trophy, Heart, Briefcase, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const jobOpenings = [
  {
    id: 1,
    title: "Senior Fragrance Consultant",
    department: "Sales & Customer Experience",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "3-5 years",
    posted: "2024-01-10",
    description: "Join our flagship store team to provide exceptional fragrance consultation services to our discerning customers.",
    requirements: ["3+ years in luxury retail", "Fragrance knowledge", "Customer service excellence", "English & Bengali fluency"]
  },
  {
    id: 2,
    title: "Store Manager",
    department: "Retail Operations",
    location: "Gulshan, Dhaka",
    type: "Full-time", 
    experience: "5+ years",
    posted: "2024-01-08",
    description: "Lead our premium boutique operations and drive exceptional customer experiences in our Gulshan location.",
    requirements: ["5+ years management experience", "Luxury retail background", "Team leadership skills", "Sales target achievement"]
  },
  {
    id: 3,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Remote/Dhaka",
    type: "Full-time",
    experience: "2-4 years",
    posted: "2024-01-05",
    description: "Drive our digital presence and engage luxury fragrance enthusiasts across Bangladesh through innovative campaigns.",
    requirements: ["Digital marketing expertise", "Social media management", "Content creation skills", "Analytics proficiency"]
  },
  {
    id: 4,
    title: "Regional Sales Coordinator",
    department: "Sales",
    location: "Chittagong, Bangladesh",
    type: "Full-time",
    experience: "2-3 years",
    posted: "2024-01-03",
    description: "Coordinate sales activities and support store operations across our Chittagong and regional locations.",
    requirements: ["Sales coordination experience", "Regional travel flexibility", "Organizational skills", "CRM system knowledge"]
  }
];

const benefits = [
  {
    icon: <Trophy className="w-8 h-8 text-primary" />,
    title: "Competitive Compensation",
    description: "Attractive salary packages with performance-based incentives and annual bonuses"
  },
  {
    icon: <Heart className="w-8 h-8 text-primary" />,
    title: "Health & Wellness",
    description: "Comprehensive health insurance coverage for you and your family members"
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Professional Development",
    description: "Continuous learning opportunities, fragrance training, and career advancement programs"
  },
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    title: "Employee Discounts",
    description: "Exclusive access to our fragrance collections with significant employee discounts"
  }
];

const values = [
  {
    title: "Excellence",
    description: "We strive for perfection in everything we do, from customer service to product knowledge."
  },
  {
    title: "Passion",
    description: "We are passionate about fragrances and creating memorable experiences for our customers."
  },
  {
    title: "Integrity",
    description: "We conduct business with honesty, transparency, and respect for all stakeholders."
  },
  {
    title: "Innovation",
    description: "We embrace new ideas and approaches to enhance our customers' fragrance journey."
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('/api/placeholder/1920/600')" }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-light mb-6 tracking-wider">
              JOIN OUR <span className="text-primary">TEAM</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl mx-auto">
              Be part of a passionate team dedicated to bringing the art of luxury fragrance 
              to Bangladesh. Discover your potential in the world of Parfums de Marly.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-light mb-8 tracking-wider">
              WHY <span className="text-muted-foreground">JOIN US</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Parfums de Marly Bangladesh, we believe in nurturing talent and creating an environment 
              where passion for luxury and excellence can flourish. Join us in bringing French elegance 
              and olfactory artistry to our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-8 tracking-wider">
              OUR <span className="text-muted-foreground">VALUES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-background rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-primary">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-8 tracking-wider">
              CURRENT <span className="text-muted-foreground">OPPORTUNITIES</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore exciting career opportunities with us and become part of our growing team 
              across Bangladesh.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {job.type}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Posted {new Date(job.posted).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{job.description}</p>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Key Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:ml-6">
                    <Button className="bg-primary hover:bg-primary/90 w-full lg:w-auto">
                      Apply Now
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light mb-8 tracking-wider">
              APPLICATION <span className="text-muted-foreground">PROCESS</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Our recruitment process is designed to find the right fit for both you and our team.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Submit Application</h3>
                <p className="text-sm text-muted-foreground">
                  Send us your resume and cover letter highlighting your passion for luxury retail
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Interview Process</h3>
                <p className="text-sm text-muted-foreground">
                  Meet with our team to discuss your experience and learn more about the role
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Join Our Team</h3>
                <p className="text-sm text-muted-foreground">
                  Start your journey with comprehensive training and onboarding
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't see a position that matches your skills? We're always looking for talented 
            individuals to join our team. Send us your resume and let's explore opportunities together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              View All Positions
            </Button>
            <Button size="lg" variant="outline">
              Contact HR Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}