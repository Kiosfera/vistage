import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Sparkles,
  User,
  Palette,
  TrendingUp,
  Download,
  Share2,
  RefreshCw,
  Eye,
  Heart,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResultsDisplayProps {
  userData: {
    photo: File | null;
    preferences: any;
    behavioral: any;
    analysis: any;
  };
}

const facialFeatures = [
  {
    id: "eyeShape",
    name: "Formato dos Olhos",
    value: "Amendoados",
    confidence: 92,
  },
  { id: "faceShape", name: "Formato do Rosto", value: "Oval", confidence: 88 },
  { id: "skinTone", name: "Tom de Pele", value: "Quente", confidence: 95 },
  { id: "eyeColor", name: "Cor dos Olhos", value: "Castanho", confidence: 90 },
];

const colorRecommendations = [
  {
    category: "Cores Primárias",
    colors: ["#8B4513", "#D2691E", "#CD853F"],
    description: "Tons terrosos que harmonizam com seu tom de pele",
  },
  {
    category: "Cores de Destaque",
    colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
    description: "Cores vibrantes para momentos especiais",
  },
  {
    category: "Neutros",
    colors: ["#F5F5DC", "#DDBEA9", "#CB997E"],
    description: "Base neutra para combinar facilmente",
  },
];

const personalityInsights = [
  {
    trait: "Extroversão",
    score: 75,
    description:
      "Você gosta de interação social e pode usar cores mais vibrantes",
  },
  {
    trait: "Criatividade",
    score: 65,
    description: "Está aberto a experimentar estilos únicos e inovadores",
  },
  {
    trait: "Elegância",
    score: 80,
    description: "Prefere looks sofisticados e bem coordenados",
  },
];

const styleRecommendations = [
  {
    id: "casual",
    name: "Look Casual Diário",
    description: "Perfeito para o dia a dia",
    items: [
      "Calça jeans escura",
      "Camisa bege",
      "Tênis branco",
      "Acessórios dourados",
    ],
    confidence: 94,
  },
  {
    id: "work",
    name: "Look Profissional",
    description: "Ideal para ambiente de trabalho",
    items: [
      "Blazer marrom",
      "Calça social preta",
      "Camisa branca",
      "Sapato social",
    ],
    confidence: 91,
  },
  {
    id: "party",
    name: "Look Festa",
    description: "Para ocasiões especiais",
    items: ["Vestido terra", "Salto nude", "Bolsa pequena", "Joias douradas"],
    confidence: 88,
  },
];

export default function ResultsDisplay({ userData }: ResultsDisplayProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  useEffect(() => {
    // Simulate facial analysis processing
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <RefreshCw className="w-10 h-10 text-primary animate-spin" />
        </div>
        <div>
          <h3 className="text-xl font-accent font-medium mb-2 tracking-wide">
            Analisando sua Foto
          </h3>
          <p className="text-muted-foreground mb-4">
            Nosso sistema de IA está processando sua imagem para criar
            recomendações personalizadas
          </p>
          <div className="space-y-2">
            <Progress value={analysisProgress} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {analysisProgress}% concluído
            </p>
          </div>
        </div>
        <div className="text-left max-w-md mx-auto">
          <h4 className="font-medium mb-2">Etapas da Análise:</h4>
          <div className="space-y-2 text-sm">
            <div
              className={`flex items-center gap-2 ${analysisProgress > 20 ? "text-success" : "text-muted-foreground"}`}
            >
              {analysisProgress > 20 ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <div className="w-4 h-4 border border-current rounded-full" />
              )}
              Detectando características faciais
            </div>
            <div
              className={`flex items-center gap-2 ${analysisProgress > 50 ? "text-success" : "text-muted-foreground"}`}
            >
              {analysisProgress > 50 ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <div className="w-4 h-4 border border-current rounded-full" />
              )}
              Analisando tom de pele
            </div>
            <div
              className={`flex items-center gap-2 ${analysisProgress > 80 ? "text-success" : "text-muted-foreground"}`}
            >
              {analysisProgress > 80 ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <div className="w-4 h-4 border border-current rounded-full" />
              )}
              Gerando recomendações personalizadas
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        <h3 className="text-2xl font-heading font-normal mb-2 tracking-wider">
          Análise Concluída!
        </h3>
        <p className="text-muted-foreground">
          Aqui estão suas recomendações personalizadas baseadas na sua foto e
          preferências
        </p>
      </div>

      {/* Analysis Tabs */}
      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features" className="text-xs">
            <Eye className="w-4 h-4 mr-1" />
            Características
          </TabsTrigger>
          <TabsTrigger value="colors" className="text-xs">
            <Palette className="w-4 h-4 mr-1" />
            Cores
          </TabsTrigger>
          <TabsTrigger value="personality" className="text-xs">
            <Zap className="w-4 h-4 mr-1" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="looks" className="text-xs">
            <Sparkles className="w-4 h-4 mr-1" />
            Looks
          </TabsTrigger>
        </TabsList>

        {/* Facial Features */}
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Características Faciais Detectadas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {facialFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{feature.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {feature.value}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">
                      {feature.confidence}% confiança
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Color Recommendations */}
        <TabsContent value="colors" className="space-y-4">
          {colorRecommendations.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle className="text-lg">{category.category}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {category.colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2"
                    >
                      <div
                        className="w-12 h-12 rounded-lg border-2 border-white shadow-md"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Personality Insights */}
        <TabsContent value="personality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Insights de Personalidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {personalityInsights.map((insight) => (
                <div key={insight.trait}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{insight.trait}</span>
                    <span className="text-sm text-muted-foreground">
                      {insight.score}%
                    </span>
                  </div>
                  <Progress value={insight.score} className="h-2 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Style Recommendations */}
        <TabsContent value="looks" className="space-y-4">
          {styleRecommendations.map((look) => (
            <Card key={look.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{look.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {look.description}
                    </p>
                  </div>
                  <Badge variant="secondary">{look.confidence}% match</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {look.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Baixar Relatório
        </Button>
        <Button variant="outline" className="flex-1 flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Compartilhar
        </Button>
        <Button variant="outline" className="flex-1 flex items-center gap-2">
          <Heart className="w-4 h-4" />
          Salvar Favoritos
        </Button>
      </div>

      {/* Chat with AI Button */}
      <div className="text-center">
        <Button size="lg" className="w-full sm:w-auto">
          <Brain className="w-5 h-5 mr-2" />
          Conversar com Assistente IA
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Tire dúvidas e receba dicas personalizadas sobre seu estilo
        </p>
      </div>

      {/* Additional Info */}
      <Card className="bg-accent/50 border-accent">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Próximos Passos</p>
              <p className="text-xs text-muted-foreground mt-1">
                Baseado na sua análise, recomendamos atualiza��ões no seu
                guarda-roupa que irão destacar suas melhores características.
                Consulte um personal stylist para implementar essas
                recomendações.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
