import Link from "next/link"
import { Heart, Activity, Users, Shield, Globe, Clock, CheckCircle2, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-red-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                EBOLA EMERGENCY SUPPORT
              </span>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/apply" className="text-gray-600 hover:text-primary transition-colors">
                Apply Now
              </Link>
              <Link href="/check-status" className="text-gray-600 hover:text-primary transition-colors">
                Check Status
              </Link>
              <Link href="/admin/login" className="text-gray-600 hover:text-primary transition-colors">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-900/80 z-10" />
        <div className="relative h-[600px] bg-cover bg-center" style={{
          backgroundImage: `url('/images/hero-healthcare-workers.jpg')`,
        }}>
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Emergency Ebola Treatment & Financial Assistance
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                We provide critical financial support for individuals and families affected by Ebola. 
                Fast, compassionate, and confidential assistance when you need it most.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Apply for Assistance
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/check-status"
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
                >
                  Check Application Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Families Supported", value: "15,000+" },
              { icon: Globe, label: "Countries Reached", value: "12" },
              { icon: Heart, label: "Financial Aid Distributed", value: "$2.5M+" },
              { icon: Clock, label: "Average Response Time", value: "48 hours" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <stat.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How We Can Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: "Treatment Support",
                desc: "Financial assistance for Ebola treatment, medication, and hospital care.",
              },
              {
                icon: Users,
                title: "Family Support",
                desc: "Support for families affected by Ebola, including basic needs and education.",
              },
              {
                icon: Shield,
                title: "Prevention Education",
                desc: "Community education and awareness programs to prevent outbreaks.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How to Apply</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Fill Application", desc: "Complete our simple online form" },
              { step: "2", title: "Submit Documents", desc: "Provide required documentation" },
              { step: "3", title: "Review Process", desc: "Our team reviews your application" },
              { step: "4", title: "Receive Support", desc: "Get financial assistance quickly" },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Emergency Assistance?</h2>
          <p className="text-xl mb-8">
            Don't wait. Apply now and receive the support you need within 48 hours.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg"
          >
            Start Your Application
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="h-8 w-8 text-red-600" />
                <span className="text-xl font-bold">EBOLA EMERGENCY SUPPORT</span>
              </div>
              <p className="text-gray-400">
                Providing emergency financial assistance to Ebola victims and their families since 2020.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/apply" className="hover:text-white">Apply for Assistance</Link></li>
                <li><Link href="/check-status" className="hover:text-white">Check Status</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@ebolaemergency.org</li>
                <li>Phone: +1-800-EBOLA-AID</li>
                <li>Hours: 24/7 Emergency Line</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2026 Ebola Emergency Support. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
