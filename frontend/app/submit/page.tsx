"use client"

import type React from "react"

import { Header } from "@/components/layout/header"
import { useState } from "react"

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    title: "",
    description: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const response = await fetch('/talk-requests', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to submit');

      setSubmitResult({
        success: true,
        message: "Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.",
      })

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        company: "",
        title: "",
        description: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitResult({
        success: false,
        message: "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз позже.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white text-gray-800">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <h2 className="text-4xl font-bold text-pink-600 mb-6">Подать доклад</h2>
          <p className="text-xl mb-6 text-gray-700">Хотите выступить на MoscowJS? Заполните форму ниже:</p>

          {submitResult && (
            <div
              className={`p-4 mb-6 rounded-md ${submitResult.success ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}
            >
              {submitResult.message}
            </div>
          )}

          <div className="max-w-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block mb-2 font-medium text-gray-700">
                  Имя и фамилия
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  placeholder="Иван Иванов"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  placeholder="ivan@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block mb-2 font-medium text-gray-700">
                  Компания
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  placeholder="Название компании"
                />
              </div>

              <div>
                <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
                  Тема доклада
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  placeholder="Тема вашего доклада"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block mb-2 font-medium text-gray-700">
                  Описание доклада
                </label>
                <textarea
                  id="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  placeholder="Краткое описание вашего доклада"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-pink-600 text-white font-bold rounded-md hover:bg-pink-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

