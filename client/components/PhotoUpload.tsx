import React, { useState, useRef } from "react";
import { Upload, Camera, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  onPhotoUpload: (file: File) => void;
}

export default function PhotoUpload({ onPhotoUpload }: PhotoUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione apenas arquivos de imagem.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      alert("O arquivo deve ter no máximo 10MB.");
      return;
    }

    setSelectedFile(file);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Simulate upload progress
    simulateUpload(file);
  };

  const simulateUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setUploadProgress(i);
    }

    setIsUploading(false);
    setIsUploaded(true);
    onPhotoUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    setIsUploading(false);
    setIsUploaded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Camera className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-accent font-medium mb-2 tracking-wide">
          Faça upload da sua foto
        </h3>
        <p className="text-muted-foreground">
          Escolha uma foto clara do seu rosto para uma análise mais precisa
        </p>
      </div>

      {!selectedFile ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-accent/50",
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={openFileDialog}
        >
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <div className="space-y-2">
            <p className="text-lg font-medium">
              Clique para fazer upload ou arraste sua foto aqui
            </p>
            <p className="text-sm text-muted-foreground">
              PNG, JPG ou JPEG até 10MB
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Photo Preview */}
          <div className="relative">
            <div className="aspect-square max-w-xs sm:max-w-sm mx-auto rounded-xl overflow-hidden bg-muted">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {!isUploading && !isUploaded && (
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={removePhoto}
              >
                <X className="w-4 h-4" />
              </Button>
            )}

            {isUploaded && (
              <div className="absolute top-2 right-2 bg-success text-success-foreground rounded-full p-2">
                <CheckCircle className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fazendo upload...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {/* Upload Success */}
          {isUploaded && (
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2 text-success">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">
                  Upload concluído com sucesso!
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sua foto está sendo processada para análise
              </p>
            </div>
          )}

          {/* File Info */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {!isUploading && (
                <Button variant="outline" size="sm" onClick={removePhoto}>
                  Trocar foto
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-accent rounded-lg p-4">
        <h4 className="font-medium text-sm mb-2">
          Dicas para uma melhor análise:
        </h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Use uma foto com boa iluminação</li>
          <li>• Certifique-se de que seu rosto está claramente visível</li>
          <li>• Evite usar óculos escuros ou acessórios que cubram o rosto</li>
          <li>• Mantenha uma expressão neutra</li>
        </ul>
      </div>
    </div>
  );
}
