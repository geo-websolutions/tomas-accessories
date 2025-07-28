'use client'
import { useState, useRef } from 'react'
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuthGuard } from '@/hooks/useAuthGaurd'
import { convertImageToWebP } from '@/utils/imageResizer'
import CustomModal from '@/components/Modal'
import { motion } from 'framer-motion'

export default function AddProductForm() {
  useAuthGuard()
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    content: '',
    timerDuration: 0
  })
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    imageUrl: '',
    featured: false,
    hasDiscount: false,
    discountPrice: ''
  })

  const showModal = (title, content, timerDuration = 0) => {
    setModal({
      isOpen: true,
      title,
      content,
      timerDuration
    })
  }

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    setFormData(prev => {
      // If hasDiscount is toggled off, set discountPrice equal to price
      if (name === 'hasDiscount' && !checked) {
        return {
          ...prev,
          [name]: checked,
          discountPrice: prev.price
        }
      }
      
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }
    })
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const validExtensions = ['jpg', 'jpeg', 'png', 'webp']
    const fileExt = file.name.split('.').pop().toLowerCase()

    if (!validTypes.includes(file.type.toLowerCase())) {
      showModal('خطأ في نوع الملف', 'الرجاء تحميل صورة من نوع JPEG أو PNG أو WebP')
      return
    }

    if (!validExtensions.includes(fileExt)) {
      showModal('خطأ في نوع الملف', 'الرجاء تحميل صورة من نوع JPEG أو PNG أو WebP')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      showModal('حجم الملف كبير', 'يجب أن يكون حجم الصورة أقل من 5MB')
      return
    }

    try {
      const webpFile = await convertImageToWebP(file, 80)
      setSelectedFile(webpFile)
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, imageUrl: previewUrl }))
    } catch (error) {
      showModal('خطأ في تحويل الصورة', 'حدث خطأ أثناء معالجة الصورة')
    }
  }

  const triggerFileInput = () => { 
    fileInputRef.current.click()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedFile) {
      showModal('صورة مطلوبة', 'الرجاء اختيار صورة للمنتج')
      return
    }

    setLoading(true)

    try {
      // First create the document in Firestore to get its ID
      const docRef = await addDoc(collection(db, 'products'), {
        ...formData,
        price: parseFloat(formData.price),
        discountPrice: formData.hasDiscount ? parseFloat(formData.discountPrice) : parseFloat(formData.price),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        imageUrl: '' // Will be updated after image upload
      })

      // Now upload the image with the document ID as filename
      const fileName = `${docRef.id}.webp`
      const filePath = `${formData.category}/${formData.subcategory}/${fileName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: 'image/webp',
        })

      if (uploadError) throw uploadError

      // Get the permanent public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(uploadData.path)

      // Update the document with the image URL
      await updateDoc(docRef, {
        imageUrl: publicUrl
      })

      // Show success message
      showModal('نجاح', 'تم إضافة المنتج بنجاح', 2000)
      
      // Reset the form after successful submission
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        subcategory: '',
        imageUrl: '',
        featured: false,
        hasDiscount: false,
        discountPrice: ''
      })
      
      // Clear the selected file
      setSelectedFile(null)
      
      // Revoke the object URL if it exists
      if (formData.imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(formData.imageUrl)
      }
      
    } catch (error) {
      console.error('Error:', error)
      showModal('خطأ', 'حدث خطأ أثناء إضافة المنتج')
    } finally {
      setLoading(false)
    }
  }

  const removeImage = () => {
    setSelectedFile(null)
    setFormData(prev => ({ ...prev, imageUrl: '' }))
    // Revoke the object URL to avoid memory leaks
    if (formData.imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(formData.imageUrl)
    }
  }

  return (
    <div dir='rtl' className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mt-10 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            اضافة منتج جديد
          </h1>
          <p className="mt-3 text-xl text-gray-300">
            قم بملء التفاصيل بالاسفل لإضافة منتج جديد إلى متجرك
          </p>
        </div>

        <div className="bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                اسم المنتج
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-md border-0 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Premium T-Shirt"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                الوصف
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-md border-0 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="100% cotton, comfortable fit..."
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-300">
                السعر (ج م)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 sm:text-sm">ج م</span>
                </div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="block w-full pl-7 pr-12 py-3 rounded-md border-0 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="29.99"
                />
              </div>
            </div>

            {/* Discount Options */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="hasDiscount"
                  name="hasDiscount"
                  type="checkbox"
                  checked={formData.hasDiscount}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700"
                />
                <label htmlFor="hasDiscount" className="mr-2 block text-sm text-gray-300">
                  عرض خاص/خصم
                </label>
              </div>

              {formData.hasDiscount && (
                <div>
                  <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-300">
                    سعر الخصم (ج م)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 sm:text-sm">ج م</span>
                    </div>
                    <input
                      type="number"
                      name="discountPrice"
                      id="discountPrice"
                      step="0.01"
                      min="0"
                      required={formData.hasDiscount}
                      value={formData.discountPrice}
                      onChange={handleChange}
                      className="block w-full pl-7 pr-12 py-3 rounded-md border-0 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="24.99"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Category & Subcategory */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                  الصنف
                </label>
                <div className="mt-1">
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-md border-0 bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option disabled value="">اختار الصنف</option>
                    <option value="necklace">سلاسل</option>
                    <option value="ring">خواتم</option>
                    <option value="earring">حلقان</option>
                    <option value="bracelet">اساور</option>
                    <option value="watch">ساعات</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subcategory" className="block text-sm font-medium text-gray-300">
                  النوع
                </label>
                <div className="mt-1">
                  <select
                    id="subcategory"
                    name="subcategory"
                    required
                    value={formData.subcategory}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-md border-0 bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option disabled value="">اختار النوع</option>
                    <option value="male">رجالى</option>
                    <option value="female">حريمى</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                صورة المنتج
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/jpeg, image/png, image/webp"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={triggerFileInput}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-md border border-dashed border-gray-600 bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {selectedFile ? 'تغيير الصورة' : 'اختيار صورة'}
                </button>
              </div>
              
              {/* Preview Card */}
              {formData.imageUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <h3 className="text-lg font-medium text-gray-300 mb-4">معاينة المنتج</h3>
                    
                    <div className="group relative rounded-xl overflow-hidden bg-gray-700 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500">
                      {/* Discount Ribbon */}
                      {formData.hasDiscount && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-xs z-10 rotate-12 shadow-lg">
                          خصم {Math.round(((parseFloat(formData.price) - parseFloat(formData.discountPrice)) / parseFloat(formData.price)) * 100)}%
                        </div>
                      )}

                      {/* Image Preview */}
                      <div className="relative h-64 w-full overflow-hidden">
                        <img 
                          src={formData.imageUrl} 
                          alt="Product preview" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/50 to-transparent"></div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                          <h4 className="text-lg font-bold text-white">{formData.name}</h4>
                        </div>
                        
                        {/* Description */}
                        {formData.description && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-300 text-sm mb-4 leading-relaxed mt-2"
                          >
                            {formData.description}
                          </motion.p>
                        )}
                        
                        <div className="flex justify-between items-center mt-4">
                          <div>
                            {formData.hasDiscount ? (
                              <>
                                <span className="text-gray-400 text-sm line-through mr-2">
                                  {formData.price} ج.م
                                </span>
                                <span className="text-yellow-400 font-bold">
                                  {formData.discountPrice} ج.م
                                </span>
                              </>
                            ) : (
                              <span className="text-yellow-400 font-bold">
                                {formData.price} ج.م
                              </span>
                            )}
                          </div>
                          
                          {/* Optional CTA Button */}
                          <div className="relative px-4 py-2 bg-yellow-600 text-gray-900 text-sm font-medium rounded-full overflow-hidden">
                            <span className="relative z-10">عرض المنتج</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 -left-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 group-hover:animate-shine transition-all duration-500"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Featured */}
            <div className="flex items-center">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700"
              />
              <label htmlFor="featured" className="mr-2 block text-sm text-gray-300">
                منتج مميز
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || !formData.imageUrl}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${(loading || !formData.imageUrl) ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري المعالجة...
                  </>
                ) : 'إضافة المنتج'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom Modal */}
      <CustomModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        content={modal.content}
        timerDuration={modal.timerDuration}
      />
    </div>
  )
}