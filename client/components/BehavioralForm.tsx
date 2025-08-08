import React, { useState } from "react";
import { Brain, Users, Target, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface BehavioralFormProps {
  onSubmit: (behavioral: any) => void;
}

const personalityTraits = [
  {
    id: "extroversion",
    name: "Extroversão",
    description: "Como você se relaciona com outras pessoas",
    icon: Users,
    leftLabel: "Introvertido",
    rightLabel: "Extrovertido",
  },
  {
    id: "attention",
    name: "Atenção a Detalhes",
    description: "O quanto você nota pequenos detalhes",
    icon: Target,
    leftLabel: "Visão Geral",
    rightLabel: "Muito Detalhista",
  },
  {
    id: "planning",
    name: "Planejamento",
    description: "Como você organiza suas atividades",
    icon: Clock,
    leftLabel: "Espontâneo",
    rightLabel: "Muito Planejado",
  },
  {
    id: "energy",
    name: "Nível de Energia",
    description: "Sua energia ao longo do dia",
    icon: Zap,
    leftLabel: "Calmo/Relaxado",
    rightLabel: "Muito Energético",
  },
];

const lifestyleQuestions = [
  {
    id: "workStyle",
    question: "Como você prefere trabalhar?",
    options: [
      { value: "office", label: "Escritório formal" },
      { value: "hybrid", label: "Híbrido (casa + escritório)" },
      { value: "remote", label: "Totalmente remoto" },
      { value: "creative", label: "Ambiente criativo/casual" },
    ],
  },
  {
    id: "socialFrequency",
    question: "Com que frequência você sai para eventos sociais?",
    options: [
      { value: "rarely", label: "Raramente (1-2x por mês)" },
      { value: "sometimes", label: "Às vezes (1x por semana)" },
      { value: "often", label: "Frequentemente (2-3x por semana)" },
      { value: "daily", label: "Quase diariamente" },
    ],
  },
  {
    id: "decisionMaking",
    question: "Como você toma decisões sobre roupas?",
    options: [
      { value: "quick", label: "Rápido e intuitivo" },
      { value: "research", label: "Pesquiso bastante antes" },
      { value: "advice", label: "Peço opinião de outros" },
      { value: "mood", label: "Baseado no meu humor" },
    ],
  },
  {
    id: "priorities",
    question: "O que é mais importante para você ao se vestir?",
    options: [
      { value: "comfort", label: "Conforto acima de tudo" },
      { value: "style", label: "Estilo e aparência" },
      { value: "practicality", label: "Praticidade" },
      { value: "expression", label: "Expressão pessoal" },
    ],
  },
];

export default function BehavioralForm({ onSubmit }: BehavioralFormProps) {
  const [personalityScores, setPersonalityScores] = useState<
    Record<string, number>
  >({
    extroversion: 50,
    attention: 50,
    planning: 50,
    energy: 50,
  });
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handlePersonalityChange = (traitId: string, value: number[]) => {
    setPersonalityScores((prev) => ({
      ...prev,
      [traitId]: value[0],
    }));
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    const behavioral = {
      personality: personalityScores,
      lifestyle: answers,
    };
    onSubmit(behavioral);
  };

  const isComplete = Object.keys(answers).length === lifestyleQuestions.length;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center mb-6">
        <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-4" />
        <h3 className="text-lg sm:text-xl font-accent font-medium mb-2 tracking-wide">
          Perfil Comportamental
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground px-2">
          Entenda melhor sua personalidade para recomendações personalizadas
        </p>
      </div>

      {/* Personality Traits */}
      <div className="space-y-6">
        <h4 className="text-lg font-accent font-medium tracking-wide">
          Traços de Personalidade
        </h4>
        {personalityTraits.map((trait) => {
          const Icon = trait.icon;
          return (
            <Card key={trait.id} className="p-4 sm:p-6">
              <CardContent className="p-0">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium">{trait.name}</h5>
                    <p className="text-sm text-muted-foreground">
                      {trait.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Slider
                    value={[personalityScores[trait.id]]}
                    onValueChange={(value) =>
                      handlePersonalityChange(trait.id, value)
                    }
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{trait.leftLabel}</span>
                    <span className="font-medium">
                      {personalityScores[trait.id]}%
                    </span>
                    <span>{trait.rightLabel}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Lifestyle Questions */}
      <div className="space-y-6">
        <h4 className="text-lg font-accent font-medium tracking-wide">
          Estilo de Vida
        </h4>
        {lifestyleQuestions.map((question) => (
          <Card key={question.id} className="p-6">
            <CardContent className="p-0">
              <Label className="text-base font-medium mb-4 block">
                {question.question}
              </Label>
              <RadioGroup
                value={answers[question.id] || ""}
                onValueChange={(value) =>
                  handleAnswerChange(question.id, value)
                }
                className="space-y-3"
              >
                {question.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`${question.id}-${option.value}`}
                    />
                    <Label
                      htmlFor={`${question.id}-${option.value}`}
                      className="flex-1 cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Personality Insights Preview */}
      <Card className="bg-accent/50 border-accent">
        <CardContent className="p-6">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Prévia do seu Perfil
          </h4>
          <div className="space-y-2 text-sm">
            {personalityScores.extroversion > 60 && (
              <p>
                • Você parece ser uma pessoa extrovertida que gosta de interação
                social
              </p>
            )}
            {personalityScores.extroversion < 40 && (
              <p>
                • Você tende a ser mais reservado e valoriza momentos tranquilos
              </p>
            )}
            {personalityScores.attention > 70 && (
              <p>• Você tem atenção especial a detalhes e qualidade</p>
            )}
            {personalityScores.planning > 60 && (
              <p>• Você prefere organização e planejamento em suas escolhas</p>
            )}
            {personalityScores.energy > 70 && (
              <p>
                • Você tem alta energia e pode preferir looks mais dinâmicos
              </p>
            )}
            {Object.keys(answers).length > 0 && (
              <p>
                • Suas respostas sobre estilo de vida serão consideradas nas
                recomendações
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleSubmit}
        disabled={!isComplete}
        className="w-full"
        size="lg"
      >
        Continuar para Resultados
      </Button>
    </div>
  );
}
