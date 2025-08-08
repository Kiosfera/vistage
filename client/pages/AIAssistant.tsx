import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AIStyleAssistant from '@/components/AIStyleAssistant';

export default function AIAssistant() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 md:py-8 lg:py-10">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Onboarding
            </Button>
          </Link>
          <h1 className="text-3xl font-heading font-normal text-foreground tracking-wide">
            Assistente de Estilo IA
          </h1>
          <p className="text-muted-foreground mt-2">
            Sua consultora virtual está sempre disponível para te ajudar
          </p>
        </div>

        {/* AI Assistant */}
        <div className="max-w-4xl mx-auto">
          <AIStyleAssistant />
        </div>
      </div>
    </div>
  );
}
