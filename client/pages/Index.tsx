import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Upload,
  Camera,
  User,
  Brain,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PhotoUpload from "@/components/PhotoUpload";
import PreferencesForm from "@/components/PreferencesForm";
import BehavioralForm from "@/components/BehavioralForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import AIStyleAssistant from "@/components/AIStyleAssistant";

const steps = [
  {
    id: 1,
    title: "Bem-vindo",
    description: "Vamos começar seu perfil personalizado",
    icon: User,
  },
  {
    id: 2,
    title: "Sua Foto",
    description: "Faça upload da sua foto para análise",
    icon: Camera,
  },
  {
    id: 3,
    title: "Preferências",
    description: "Conte-nos sobre seu estilo pessoal",
    icon: Sparkles,
  },
  {
    id: 4,
    title: "Comportamento",
    description: "Suas preferências comportamentais",
    icon: Brain,
  },
  {
    id: 5,
    title: "Resultados",
    description: "Sua análise facial personalizada",
    icon: Check,
  },
  {
    id: 6,
    title: "Assistente IA",
    description: "Converse com sua consultora virtual",
    icon: MessageCircle,
  },
];

export default function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    photo: null as File | null,
    preferences: {},
    behavioral: {},
    analysis: null,
  });

  const progress = (currentStep / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePhotoUpload = (file: File) => {
    setUserData((prev) => ({ ...prev, photo: file }));
  };

  const handlePreferences = (preferences: any) => {
    setUserData((prev) => ({ ...prev, preferences }));
  };

  const handleBehavioral = (behavioral: any) => {
    setUserData((prev) => ({ ...prev, behavioral }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <User className="w-12 h-12 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-heading font-normal text-foreground mb-4 tracking-wider">
                Bem-vindo ao seu Onboarding
              </h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                Vamos criar um perfil personalizado baseado na sua foto e
                preferências. O processo é rápido e seguro.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium">Análise Facial</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium">Preferências</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium">
                  Perfil Comportamental
                </span>
              </div>
            </div>
          </div>
        );
      case 2:
        return <PhotoUpload onPhotoUpload={handlePhotoUpload} />;
      case 3:
        return <PreferencesForm onSubmit={handlePreferences} />;
      case 4:
        return <BehavioralForm onSubmit={handleBehavioral} />;
      case 5:
        return <ResultsDisplay userData={userData} />;
      case 6:
        return <AIStyleAssistant userData={userData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-heading font-normal text-foreground tracking-wide">
              Onboarding
            </h1>
            <span className="text-sm text-muted-foreground">
              Passo {currentStep} de {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Navigation */}
        <div className="mb-8">
          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden">
            <div className="flex items-center space-x-3 overflow-x-auto pb-2 px-4">
              {steps.map((step, index) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                const Icon = step.icon;

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center min-w-0 flex-shrink-0"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isCompleted
                          ? "bg-primary text-primary-foreground"
                          : isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <p
                      className={`text-xs mt-1 text-center ${
                        isActive
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop: Full layout */}
          <div className="hidden md:flex justify-center">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                const Icon = step.icon;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-2 ${
                      index !== steps.length - 1 ? "mr-8" : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isCompleted
                          ? "bg-primary text-primary-foreground"
                          : isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                    {index !== steps.length - 1 && (
                      <div className="w-16 h-px bg-border ml-4" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-xl font-accent font-medium tracking-wide">
                {steps[currentStep - 1].title}
              </CardTitle>
              <p className="text-muted-foreground">
                {steps[currentStep - 1].description}
              </p>
            </CardHeader>
            <CardContent className="pt-0">{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center justify-center space-x-2 order-2 sm:order-1"
              size="lg"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </Button>

            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length}
              className="flex items-center justify-center space-x-2 order-1 sm:order-2"
              size="lg"
            >
              <span>
                {currentStep === steps.length ? "Finalizar" : "Próximo"}
              </span>
              {currentStep !== steps.length && (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
