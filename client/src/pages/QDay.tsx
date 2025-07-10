import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

// Import the Q-Day images
import image1 from "@assets/1-CSNZYjmi_1752107478866.jpg";
import image2 from "@assets/2-DWYDZnq7_1752107478866.jpg";
import image3 from "@assets/3-mmmYXysA_1752107478866.jpg";
import image4 from "@assets/4-KOFQc0KA_1752107478866.jpg";
import image5 from "@assets/5-Cv8lHLRv_1752107478866.jpg";
import image7 from "@assets/7-Qn1ih-fg_1752107478865.jpg";
import image8 from "@assets/8-DRoWjwO7_1752107478865.jpg";
import image9 from "@assets/9-O4ncYmE-_1752107478865.jpg";
import image10 from "@assets/10-CQrJO4HA_1752107478865.jpg";
import image12 from "@assets/12-BDVmoAWm_1752107478865.jpg";

const qDayImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image7,
  image8,
  image9,
  image10,
  image12,
];

export default function QDay() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              What is <span className="text-primary">Q-Day</span>?
            </h1>

            {/* Quantum particles animation */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className="glass-card p-8 lg:p-12">
              <CardContent className="p-0">
                <div className="space-y-6 text-lg leading-relaxed">
                  <p className="text-muted-foreground">
                    Bitcoin's security depends on cryptography that classical
                    computers cannot break, as finding a private key would take
                    longer than the age of the universe.
                  </p>
                  <p className="text-muted-foreground">
                    This allows users to trust mathematical laws for asset
                    security without third parties, assuming proper security
                    practices. However, quantum computers using Shor's algorithm
                    could derive private keys from public keys, threatening
                    Bitcoin's security even with perfect user practices.
                  </p>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-lg"></div>
                    <p className="text-muted-foreground relative">
                      <strong>Q-Day</strong> is the anticipated future moment
                      when quantum computers gain the power to break these
                      cryptographic algorithms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative max-w-4xl mx-auto">
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 4000,
                  }),
                ]}
                className="w-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {qDayImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative">
                        <Card className="glass-card overflow-hidden">
                          <CardContent className="p-0">
                            <img
                              src={image}
                              alt={`Q-Day insight ${index + 1}`}
                              className="w-full h-96 object-contain bg-white transition-transform duration-700 hover:scale-105"
                            />
                          </CardContent>
                        </Card>
                        {/* Gradient overlay for better text contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-black/50 border-primary/50 hover:bg-black/70 text-white" />
                <CarouselNext className="right-4 bg-black/50 border-primary/50 hover:bg-black/70 text-white" />
              </Carousel>

              {/* Decorative quantum circuit pattern */}
              <div className="absolute -top-4 -right-4 w-32 h-32 opacity-10">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-primary"
                >
                  <defs>
                    <pattern
                      id="quantum-circuit"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="10" cy="10" r="2" fill="currentColor" />
                      <line
                        x1="0"
                        y1="10"
                        x2="20"
                        y2="10"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#quantum-circuit)" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Don't Wait for <span className="text-primary">Q-Day</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Prepare your Bitcoin for the quantum future today. Join the
              quantum-safe revolution with qBTC.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
              >
                Learn More About qBTC
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
