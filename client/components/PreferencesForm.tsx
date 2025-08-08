import React, { useState } from 'react';
import { Sparkles, Palette, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface PreferencesFormProps {
  onSubmit: (preferences: any) => void;
}

const colorPalettes = [
  { id: 'warm', name: 'Tons Quentes', colors: ['#FF6B6B', '#FF8E53', '#FF6B9D'], description: 'Cores vibrantes e acolhedoras' },
  { id: 'cool', name: 'Tons Frios', colors: ['#4ECDC4', '#45B7D1', '#96CEB4'], description: 'Cores calmas e refrescantes' },
  { id: 'neutral', name: 'Neutros', colors: ['#95A5A6', '#BDC3C7', '#E8E8E8'], description: 'Cores equilibradas e versáteis' },
  { id: 'bold', name: 'Cores Vibrantes', colors: ['#9B59B6', '#E74C3C', '#F39C12'], description: 'Cores marcantes e energéticas' },
  { id: 'pastel', name: 'Tons Pastéis', colors: ['#FFB6C1', '#DDA0DD', '#98FB98'], description: 'Cores suaves e delicadas' },
  { id: 'earth', name: 'Tons Terrosos', colors: ['#D2691E', '#8B4513', '#A0522D'], description: 'Cores naturais e orgânicas' },
];

const styles = [
  { id: 'classic', name: 'Clássico', icon: '👔', description: 'Elegante e atemporal' },
  { id: 'modern', name: 'Moderno', icon: '✨', description: 'Contemporâneo e minimalista' },
  { id: 'bohemian', name: 'Boêmio', icon: '🌸', description: 'Livre e artístico' },
  { id: 'edgy', name: 'Arrojado', icon: '⚡', description: 'Ousado e diferente' },
  { id: 'romantic', name: 'Romântico', icon: '💕', description: 'Suave e feminino' },
  { id: 'sporty', name: 'Esportivo', icon: '👟', description: 'Confortável e prático' },
];

const occasions = [
  { id: 'work', name: 'Trabalho', icon: '💼' },
  { id: 'casual', name: 'Casual', icon: '👕' },
  { id: 'formal', name: 'Formal', icon: '👔' },
  { id: 'party', name: 'Festa', icon: '🎉' },
  { id: 'date', name: 'Encontro', icon: '💕' },
  { id: 'travel', name: 'Viagem', icon: '✈️' },
];

export default function PreferencesForm({ onSubmit }: PreferencesFormProps) {
  const [selectedPalette, setSelectedPalette] = useState<string>('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState([500]);
  const [adventurous, setAdventurous] = useState([50]);

  const handleStyleToggle = (styleId: string) => {
    setSelectedStyles(prev =>
      prev.includes(styleId)
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    );
  };

  const handleOccasionToggle = (occasionId: string) => {
    setSelectedOccasions(prev =>
      prev.includes(occasionId)
        ? prev.filter(id => id !== occasionId)
        : [...prev, occasionId]
    );
  };

  const handleSubmit = () => {
    const preferences = {
      colorPalette: selectedPalette,
      styles: selectedStyles,
      occasions: selectedOccasions,
      budgetRange: budgetRange[0],
      adventurousness: adventurous[0],
    };
    onSubmit(preferences);
  };

  const isComplete = selectedPalette && selectedStyles.length > 0 && selectedOccasions.length > 0;

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-accent font-medium mb-2 tracking-wide">Suas Preferências Estéticas</h3>
        <p className="text-muted-foreground">
          Nos conte sobre seu estilo pessoal para recomendações mais precisas
        </p>
      </div>

      {/* Color Palette Selection */}
      <div className="space-y-4">
        <Label className="text-base font-medium flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Paleta de Cores Preferida
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {colorPalettes.map((palette) => (
            <Card
              key={palette.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                selectedPalette === palette.id
                  ? "ring-2 ring-primary border-primary"
                  : "hover:border-primary/50"
              )}
              onClick={() => setSelectedPalette(palette.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{palette.name}</p>
                    <p className="text-xs text-muted-foreground">{palette.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Style Preferences */}
      <div className="space-y-4">
        <Label className="text-base font-medium flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Estilos que Combinam com Você (escolha até 3)
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {styles.map((style) => (
            <Card
              key={style.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                selectedStyles.includes(style.id)
                  ? "ring-2 ring-primary border-primary bg-primary/5"
                  : "hover:border-primary/50",
                selectedStyles.length >= 3 && !selectedStyles.includes(style.id)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              )}
              onClick={() => {
                if (selectedStyles.length < 3 || selectedStyles.includes(style.id)) {
                  handleStyleToggle(style.id);
                }
              }}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{style.icon}</div>
                <p className="font-medium text-sm">{style.name}</p>
                <p className="text-xs text-muted-foreground">{style.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {selectedStyles.length >= 3 && (
          <p className="text-xs text-muted-foreground">
            Máximo de 3 estilos selecionados
          </p>
        )}
      </div>

      {/* Occasions */}
      <div className="space-y-4">
        <Label className="text-base font-medium flex items-center gap-2">
          <Star className="w-5 h-5" />
          Ocasiões Principais
        </Label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {occasions.map((occasion) => (
            <Card
              key={occasion.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                selectedOccasions.includes(occasion.id)
                  ? "ring-2 ring-primary border-primary bg-primary/5"
                  : "hover:border-primary/50"
              )}
              onClick={() => handleOccasionToggle(occasion.id)}
            >
              <CardContent className="p-3 text-center">
                <div className="text-xl mb-1">{occasion.icon}</div>
                <p className="font-medium text-xs">{occasion.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Budget Range */}
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Faixa de Orçamento Mensal (R$)
        </Label>
        <div className="space-y-2">
          <Slider
            value={budgetRange}
            onValueChange={setBudgetRange}
            max={2000}
            min={100}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>R$ 100</span>
            <span className="font-medium">R$ {budgetRange[0]}</span>
            <span>R$ 2.000+</span>
          </div>
        </div>
      </div>

      {/* Adventurousness */}
      <div className="space-y-4">
        <Label className="text-base font-medium">
          Nível de Aventura no Estilo
        </Label>
        <div className="space-y-2">
          <Slider
            value={adventurous}
            onValueChange={setAdventurous}
            max={100}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Conservador</span>
            <span className="font-medium">{adventurous[0]}%</span>
            <span>Muito Aventureiro</span>
          </div>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!isComplete}
        className="w-full"
        size="lg"
      >
        Continuar
      </Button>
    </div>
  );
}
