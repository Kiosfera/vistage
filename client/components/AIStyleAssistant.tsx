import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  suggestions?: string[];
}

interface AIStyleAssistantProps {
  userData?: {
    photo: File | null;
    preferences: any;
    behavioral: any;
    analysis: any;
  };
}

const initialMessage: Message = {
  id: "1",
  content:
    "Olá! Eu sou a Luna, sua assistente de estilo pessoal com IA! 💫 Analisei seu perfil e estou aqui para te ajudar a descobrir seu potencial de estilo. Com base na sua análise facial e preferências, vou te dar dicas personalizadas que vão realçar sua beleza natural. O que você gostaria de explorar primeiro?",
  sender: "ai",
  timestamp: new Date(),
  suggestions: [
    "Que cores realçam minha beleza?",
    "Como criar looks para diferentes ocasiões?",
    "Que acessórios combinam com meu estilo?",
    "Dicas de maquiagem personalizadas",
  ],
};

const aiResponses = {
  cores: [
    "Analisando seu tom de pele, tons rosé e lilás são absolutamente perfeitos para você! ✨ Essas cores realçam sua luminosidade natural e criam uma harmonia incrível com suas características faciais.",
    "Cores douradas e creme são suas aliadas para looks elegantes! Elas trazem sofisticação e complementam perfeitamente seu tom de pele, criando um visual luminoso.",
    "Para ocasiões especiais, a combinação rosé + dourado é sua assinatura! É uma paleta que transmite elegância e confiança - perfeita para destacar sua personalidade única.",
    "Com base na sua análise, cores neutras como branco e creme são sua base ideal. Adicione toques de rosé ou lilás para criar interesse visual sem exagerar!",
  ],
  trabalho: [
    "Para o ambiente profissional, sua estratégia é sofisticação sutil! 👔 Comece com peças neutras em creme ou branco e adicione um toque de cor com um blazer rosé suave.",
    "Seu look de trabalho ideal: blazer estruturado + camisa branca + acessórios dourados discretos. Essa combinação transmite autoridade e elegância simultaneamente.",
    "Dica profissional: invista em peças de qualidade em tons neutros. Você pode variar com lenços ou acessórios em suas cores ideais para manter a sofisticação.",
    "Para reuniões importantes, aposte no poder do minimalismo elegante: cores neutras + um acessório dourado statement. Simplicidade é sinônimo de confiança!",
  ],
  acessorios: [
    "Seus acessórios de assinatura são dourados! ✨ Eles harmonizam perfeitamente com sua paleta e elevam qualquer look básico para algo especial.",
    "Para o dia a dia: brincos delicados, um colar sutil e relógio dourado. Para eventos: você pode ousar com peças statement que mantêm a elegância!",
    "Bolsas em tons neutros ou rosé combinam perfeitamente com você. Evite cores muito vibrantes que podem competir com sua beleza natural.",
    "Dica especial: óculos de sol com armação dourada ou rosé são perfeitos para você! Eles complementam sua paleta e protegem com estilo.",
  ],
  encontro: [
    "Para um encontro especial, vamos criar magia! 💕 Um vestido ou conjunto em lilás suave com acessórios dourados é a receita perfeita para você brilhar.",
    "Seu look de encontro ideal: algo que transmita feminilidade e confiança. Tons rosé ou lilás + maquiagem que realce seus olhos + um perfume marcante!",
    "Para um jantar romântico: vestido midi em tom rosé + saltos nude + joias douradas delicadas. Elegante, feminino e totalmente você!",
    "Primeira impressão conta! Aposte em peças que valorizam sua silhueta em suas cores ideais. A confiança que você irá transmitir será irresistível! ✨",
  ],
  maquiagem: [
    "Sua maquiagem ideal realça seus olhos e complementa seu tom de pele! Base com undertone quente + blush rosé + batom em tons nude ou rosé.",
    "Para o dia: base natural + máscara + batom hidratante rosé. Para a noite: adicione sombra dourada ou rosé para criar profundidade!",
    "Com seu tom de pele, sombras em tons dourados, ros�� e lilás são perfeitas! Elas harmonizam com sua paleta natural e destacam seus olhos.",
    "Dica da Luna: um gloss transparente com reflexos dourados é perfeito para você! Mantém a naturalidade mas adiciona um toque especial.",
  ],
  geral: [
    "Baseando-me na sua análise completa, você tem um estilo naturalmente elegante e sofisticado! ✨ Sua personalidade brilha com looks que misturam clássico e moderno.",
    "Você tem um perfil de estilo que valoriza qualidade sobre quantidade. Invista em peças atemporais em suas cores ideais - elas nunca saem de moda!",
    "Sua essência é feminina e confiante! Looks que destacam essa combinação são perfeitos: linhas limpas, cores harmoniosas e acessórios bem escolhidos.",
    "Lembre-se sempre: seu maior acessório é sua confiança! Com as dicas certas e suas cores ideais, você tem tudo para criar looks incríveis. 💫",
  ],
};

function getAIResponse(userMessage: string): Message {
  const message = userMessage.toLowerCase();
  let response = "";
  let suggestions: string[] = [];

  if (
    message.includes("cor") ||
    message.includes("tons") ||
    message.includes("paleta")
  ) {
    response =
      aiResponses.cores[Math.floor(Math.random() * aiResponses.cores.length)];
    suggestions = [
      "Como combinar essas cores?",
      "Maquiagem que combina",
      "Looks para cada estação",
    ];
  } else if (
    message.includes("trabalho") ||
    message.includes("profissional") ||
    message.includes("escritório")
  ) {
    response =
      aiResponses.trabalho[
        Math.floor(Math.random() * aiResponses.trabalho.length)
      ];
    suggestions = [
      "Looks para apresentações",
      "Sapatos confortáveis",
      "Como variar no dia a dia",
    ];
  } else if (
    message.includes("acessório") ||
    message.includes("joia") ||
    message.includes("bolsa")
  ) {
    response =
      aiResponses.acessorios[
        Math.floor(Math.random() * aiResponses.acessorios.length)
      ];
    suggestions = [
      "Bolsas para cada ocasião",
      "Óculos de sol ideais",
      "Joias statement",
    ];
  } else if (
    message.includes("encontro") ||
    message.includes("date") ||
    message.includes("romântico") ||
    message.includes("jantar")
  ) {
    response =
      aiResponses.encontro[
        Math.floor(Math.random() * aiResponses.encontro.length)
      ];
    suggestions = [
      "Maquiagem para encontro",
      "Sapatos para impressionar",
      "Perfumes marcantes",
    ];
  } else if (
    message.includes("maquiagem") ||
    message.includes("makeup") ||
    message.includes("batom") ||
    message.includes("sombra")
  ) {
    response =
      aiResponses.maquiagem[
        Math.floor(Math.random() * aiResponses.maquiagem.length)
      ];
    suggestions = [
      "Base ideal para mim",
      "Cores de batom",
      "Maquiagem para o dia",
    ];
  } else {
    response =
      aiResponses.geral[Math.floor(Math.random() * aiResponses.geral.length)];
    suggestions = [
      "Dicas de combinações",
      "Cuidados com as roupas",
      "Tendências que combinam",
    ];
  }

  return {
    id: Date.now().toString(),
    content: response,
    sender: "ai",
    timestamp: new Date(),
    suggestions,
  };
}

export default function AIStyleAssistant({ userData }: AIStyleAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(
      () => {
        const aiResponse = getAIResponse(content);
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    );
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
        </div>
        <h3 className="text-lg sm:text-xl font-accent font-medium mb-2 tracking-wide">
          Assistente de Estilo IA
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground px-2">
          Converse com Luna e receba dicas personalizadas de estilo
        </p>
      </div>

      <Card className="h-[400px] sm:h-[500px] flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageCircle className="w-5 h-5" />
            Chat com Luna
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea
            ref={scrollAreaRef}
            className="flex-1 px-4 overflow-y-auto"
          >
            <div className="space-y-4 py-4 min-h-0">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.sender === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  {message.sender === "ai" && (
                    <Avatar className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20">
                      <AvatarFallback>
                        <Bot className="w-4 h-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={cn(
                      "max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-2 text-sm break-words",
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>

                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs opacity-70">Sugestões:</p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-2 py-1 bg-background/50 rounded text-xs hover:bg-background/80 transition-colors break-words"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {message.sender === "user" && (
                    <Avatar className="w-8 h-8 bg-secondary">
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20">
                    <AvatarFallback>
                      <Bot className="w-4 h-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-3 py-2 text-sm max-w-[85%] sm:max-w-[80%]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua pergunta sobre estilo..."
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-auto p-3 sm:p-4 text-left flex-col items-start"
          onClick={() =>
            handleSuggestionClick("Que cores ficam melhor em mim?")
          }
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mb-2 text-primary" />
          <span className="font-medium text-sm">Minha Paleta</span>
          <span className="text-xs text-muted-foreground">
            Descubra suas cores ideais
          </span>
        </Button>

        <Button
          variant="outline"
          className="h-auto p-3 sm:p-4 text-left flex-col items-start"
          onClick={() =>
            handleSuggestionClick("Como posso criar um look para trabalho?")
          }
        >
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 mb-2 text-primary" />
          <span className="font-medium text-sm">Look Profissional</span>
          <span className="text-xs text-muted-foreground">
            Dicas para o trabalho
          </span>
        </Button>
      </div>
    </div>
  );
}
