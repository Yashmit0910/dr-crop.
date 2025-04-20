"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploaderProps {
  onUpload: (files: File[]) => void
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files).slice(0, 3))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files).slice(0, 3))
    }
  }

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))
    setSelectedFiles(imageFiles)

    // Create image previews
    const newPreviews = imageFiles.map((file) => URL.createObjectURL(file))
    setPreviews(newPreviews)
  }

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles]
    const newPreviews = [...previews]

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index])

    newFiles.splice(index, 1)
    newPreviews.splice(index, 1)

    setSelectedFiles(newFiles)
    setPreviews(newPreviews)
  }

  const handleSubmit = () => {
    if (selectedFiles.length > 0) {
      setIsAnalyzing(true)
      onUpload(selectedFiles)

      // Reset after upload (in a real app, you might want to wait for the upload to complete)
      setTimeout(() => {
        setSelectedFiles([])
        setPreviews([])
        setIsAnalyzing(false)
      }, 2000)
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? "border-green-500 bg-green-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="text-lg font-medium">Drag and drop your images here</p>
          <p className="text-sm text-gray-500">or</p>
          <Button type="button" onClick={() => inputRef.current?.click()} className="bg-green-600 hover:bg-green-700">
            Select Images
          </Button>
          <input ref={inputRef} type="file" multiple accept="image/*" onChange={handleChange} className="hidden" />
          <p className="text-xs text-gray-500">Upload up to 3 images of tomato plants (JPG, PNG)</p>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium">Selected Images ({previews.length}/3)</h3>
          <div className="grid grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <Button onClick={handleSubmit} disabled={isAnalyzing} className="w-full bg-green-600 hover:bg-green-700">
            {isAnalyzing ? "Analyzing..." : "Analyze Images"}
          </Button>
        </div>
      )}
    </div>
  )
}
