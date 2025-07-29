'use client'

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  // Organized product data in an array
  const products = [
    {
      category: "bracelet",
      name: "أساور",
      items: [
        { 
          id: 1, 
          name: "سوار الفضة الماسي",
          price: 450,
          hasDiscount: true,
          discountPrice: 380,
          discountPercentage: 16, // (450-380)/450*100 = 15.55% rounded
          description: "سوار أنيق من الفضة عيار 925 مرصع بأحجار الماس الصغيرة، تصميم كلاسيكي يناسب جميع المناسبات"
        },
        { 
          id: 2, 
          name: "سوار الذهب الصيني",
          price: 650,
          hasDiscount: false,
          discountPrice: 650,
          discountPercentage: 0,
          description: "سوار من الذهب الصيني عيار 18 قيراط بتصميم عصري أنيق، يتميز بمتانته ولمعانه الدائم"
        },
        { 
          id: 3, 
          name: "سوار مزيج الذهب والفضة",
          price: 550,
          hasDiscount: true,
          discountPrice: 490,
          discountPercentage: 11, // (550-490)/550*100 = 10.9% rounded
          description: "تحفة فنية تجمع بين الذهب والفضة في تصميم متناغم، قطعة فريدة تلفت الأنظار"
        }
      ]
    },
    {
      category: "earring",
      name: "أقراط",
      items: [
        { 
          id: 1, 
          name: "قرط الفضة المرصع",
          price: 350,
          hasDiscount: false,
          discountPrice: 350,
          discountPercentage: 0,
          description: "أقراط من الفضة عيار 925 مع زخارف مرصعة بأحجار صغيرة، خفيفة الوزن ومريحة للارتداء"
        },
        { 
          id: 2, 
          name: "قرط الذهب الصيني",
          price: 580,
          hasDiscount: true,
          discountPrice: 520,
          discountPercentage: 10, // (580-520)/580*100 = 10.34% rounded
          description: "أقراط من الذهب الصيني عيار 18 قيراط بتصميم كلاسيكي أنيق، تضيف لمسة من البريق لإطلالتك"
        },
        { 
          id: 3, 
          name: "قرط مزيج الذهب والفضة",
          price: 420,
          hasDiscount: true,
          discountPrice: 370,
          discountPercentage: 12, // (420-370)/420*100 = 11.9% rounded
          description: "تصميم مبتكر يجمع بين الذهب والفضة في تناغم جميل، مناسب للارتداء اليومي والمناسبات"
        }
      ]
    },
    {
      category: "necklace",
      name: "قلادات",
      items: [
        { 
          id: 1, 
          name: "قلادة الفضة المنقوشة",
          price: 520,
          hasDiscount: false,
          discountPrice: 520,
          discountPercentage: 0,
          description: "قلادة من الفضة عيار 925 مع نقشات يدوية دقيقة، قلادة مميزة تتناسب مع جميع الأذواق"
        },
        { 
          id: 2, 
          name: "قلادة الذهب الصيني",
          price: 780,
          hasDiscount: true,
          discountPrice: 700,
          discountPercentage: 10, // (780-700)/780*100 = 10.25% rounded
          description: "قلادة من الذهب الصيني عيار 18 قيراط بتصميم عصري فاخر، قطعة مركزية تلفت الأنظار"
        },
        { 
          id: 3, 
          name: "قلادة مزيج الذهب والفضة",
          price: 620,
          hasDiscount: true,
          discountPrice: 550,
          discountPercentage: 11, // (620-550)/620*100 = 11.29% rounded
          description: "تحفة فنية تجمع بين الذهب والفضة في تصميم متناسق، قلادة متعددة الاستخدامات"
        }
      ]
    },
    {
      category: "ring",
      name: "خواتم",
      items: [
        { 
          id: 1, 
          name: "خاتم الفضة الكلاسيكي",
          price: 380,
          hasDiscount: true,
          discountPrice: 320,
          discountPercentage: 16, // (380-320)/380*100 = 15.78% rounded
          description: "خاتم من الفضة عيار 925 بتصميم كلاسيكي أنيق، مناسب للرجال والنساء"
        },
        { 
          id: 2, 
          name: "خاتم الذهب الصيني",
          price: 680,
          hasDiscount: false,
          discountPrice: 680,
          discountPercentage: 0,
          description: "خاتم من الذهب الصيني عيار 18 قيراط بتصميم عصري، قطعة فاخرة تدوم طويلاً"
        },
        { 
          id: 3, 
          name: "خاتم مزيج الذهب والفضة",
          price: 490,
          hasDiscount: true,
          discountPrice: 420,
          discountPercentage: 14, // (490-420)/490*100 = 14.28% rounded
          description: "تصميم مبتكر يجمع بين الذهب والفضة في خاتم واحد، قطعة مميزة تناسب جميع المناسبات"
        }
      ]
    }
  ];

  return (
    <main lang='ar' dir="rtl" className="bg-gray-950 text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
        {/* Hero Image with responsive adjustments */}
        <div className="absolute inset-0">
          <Image
            src="/assets/images/home-hero.jpg"
            alt="مجوهرات توماس الفاخرة"
            fill
            priority
            className="object-cover object-center"
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/60 to-gray-950/30" />
        </div>

        {/* Hero Content with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 px-6 w-full max-w-4xl"
        >
          {/* Decorative elements */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute -top-20 -right-20 md:-right-10 w-40 h-40 border-4 border-yellow-500/30 rounded-full"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -bottom-20 -left-20 md:-left-10 w-40 h-40 border-4 border-yellow-500/30 rounded-full"
          />

          {/* Main title with gold text effect */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300">
              توماس للإكسسوارات
            </span>
          </motion.h1>

          {/* Subtitle with animated border */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 mx-auto max-w-2xl relative pb-4"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute bottom-0 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
            />
            أناقة تجمع بين الذهب الصيني والفضة 
          </motion.p>

          {/* CTA Button with hover effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <button className="relative px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-gray-900 font-bold rounded-full overflow-hidden group">
              <span className="relative z-10">اكتشف المجموعة</span>
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce flex flex-col items-center">
            <span className="text-sm text-yellow-400 mb-1">مرر لأسفل</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Products Showcase */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-950 to-gray-900">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl text-center font-bold mb-20"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300">
            تشكيلاتنا الفاخرة
          </span>
        </motion.h2>

        {products.map((product) => (
          <div key={product.category} className="mb-24">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.6 }}
              className="flex items-center mb-10"
            >
              <div className="w-16 h-1 bg-yellow-500 mr-4"></div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-200">
                {product.name}
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.items.map((item) => (
                <motion.div
                  key={`${product.category}-${item.id}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: item.id * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{ 
                    y: -15,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative rounded-2xl overflow-hidden bg-gray-800 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500"
                >
                  {/* Discount Ribbon */}
                  {item.hasDiscount && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-xs z-10 rotate-12 shadow-lg">
                      خصم {item.discountPercentage}%
                    </div>
                  )}

                  {/* Image with overlay effect */}
                  <div className="relative h-80 w-full overflow-hidden">
                    <Image
                      src={`/assets/images/female-${product.category}-0${item.id}.webp`}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/50 to-transparent"></div>
                  </div>

                  {/* Product info container */}
                  <div className="p-6">
                    {/* Title with gold accent */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl font-bold text-white mb-2 flex items-center"
                    >
                      <span className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></span>
                      {item.name}
                    </motion.h3>
                    
                    {/* Description with fade-in */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-300 text-sm mb-4 leading-relaxed"
                    >
                      {item.description}
                    </motion.p>
                    
                    {/* Price and CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-between mt-4"
                    >
                      <div>
                        {item.hasDiscount ? (
                          <>
                            <span className="text-gray-400 text-sm line-through mr-2">
                              {item.price} ج.م
                            </span>
                            <span className="text-yellow-400 font-bold">
                              {item.discountPrice} ج.م
                            </span>
                          </>
                        ) : (
                          <span className="text-yellow-400 font-bold">
                            {item.price} ج.م
                          </span>
                        )}
                      </div>
                      
                      <a 
                        href={`/products/${product.category}/${item.id}`}
                        className="relative px-4 py-2 bg-yellow-600 text-gray-900 text-sm font-medium rounded-full overflow-hidden transition-all hover:bg-yellow-500"
                      >
                        <span className="relative z-10">اشتري الآن</span>
                        <span className="absolute inset-0 bg-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </a>
                    </motion.div>
                  </div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 -left-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 group-hover:animate-shine transition-all duration-500"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-gray-900 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl text-center font-bold mb-20"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300">
            تميزنا في الخدمة
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Delivery Service */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -10 }}
            className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-yellow-500 transition-all duration-300 group"
          >
            <div className="text-yellow-500 text-4xl mb-6 w-14 h-14 flex items-center justify-center bg-gray-800 rounded-lg group-hover:bg-yellow-500 group-hover:text-gray-900 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zM9 5a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zM5 7h14M5 15h14" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-yellow-400 mb-3">شحن فاخر</h3>
            <p className="text-gray-300 leading-relaxed">
              خدمة توصيل مميزة مع تغليف فاخر وتتبع مباشر، نضمن وصول قطعكم الثمينة بأمان إلى أي مكان
            </p>
          </motion.div>

          {/* 24/7 Service */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-yellow-500 transition-all duration-300 group"
          >
            <div className="text-yellow-500 text-4xl mb-6 w-14 h-14 flex items-center justify-center bg-gray-800 rounded-lg group-hover:bg-yellow-500 group-hover:text-gray-900 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-yellow-400 mb-3">خدمة على مدار الساعة</h3>
            <p className="text-gray-300 leading-relaxed">
              فريق خدمة عملاء متاح 24/7 لمساعدتكم في أي استفسار أو طلب خاص، لأن راحتكم أولويتنا
            </p>
          </motion.div>

          {/* Quality Assurance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-yellow-500 transition-all duration-300 group"
          >
            <div className="text-yellow-500 text-4xl mb-6 w-14 h-14 flex items-center justify-center bg-gray-800 rounded-lg group-hover:bg-yellow-500 group-hover:text-gray-900 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-yellow-400 mb-3">ضمان الجودة</h3>
            <p className="text-gray-300 leading-relaxed">
              كل قطعة تمر بفحص دقيق من خبرائنا لضمان أعلى معايير الجودة والمتانة قبل وصولها إليكم
            </p>
          </motion.div>

          {/* Custom Orders */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -10 }}
            className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-yellow-500 transition-all duration-300 group"
          >
            <div className="text-yellow-500 text-4xl mb-6 w-14 h-14 flex items-center justify-center bg-gray-800 rounded-lg group-hover:bg-yellow-500 group-hover:text-gray-900 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-yellow-400 mb-3">تصاميم خاصة</h3>
            <p className="text-gray-300 leading-relaxed">
              خدمة تصميم مخصصة حيث نترجم أفكاركم إلى قطع فريدة تعبر عن شخصيتكم بلمسة من الفخامة
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-20 px-6 text-center bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl text-yellow-500 mb-6">تفضل بزيارتنا</h2>
          <p className="text-gray-300 text-lg mb-4">
            العنوان: شارع الذهب، المنصورة
          </p>
          <p className="text-gray-400">
            أوقات العمل: من السبت إلى الخميس، 9 صباحاً - 9 مساءً
          </p>
        </motion.div>
      </section>
    </main>
  );
}