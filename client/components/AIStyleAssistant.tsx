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
    "Com base na sua análise facial, tons rosé e lilás são perfeitos para você! ✨ Essas cores realçam seu tom de pele naturalmente.",
    "Cores douradas e creme também são ideais - elas trazem luminosidade ao seu rosto e criam um visual elegante.",
    "Para ocasiões especiais, experimente combinar rosé com dourado claro - é uma combinação sofisticada que destaca sua personalidade!",
  ],
  trabalho: [
    "Para o ambiente profissional, sugiro começar com uma base neutra em tons creme ou branco. 👔",
    "Adicione um blazer em tom rosé suave - é elegante mas não muito chamativo para o trabalho.",
    "Complete com acessórios dourados discretos como um relógio ou brincos pequenos. Lembre-se: elegância está nos detalhes!",
  ],
  acessorios: [
    "Seus acessórios ideais são em tons dourados! ✨ Eles complementam perfeitamente sua paleta de cores.",
    "Para o dia a dia: brincos pequenos, colar delicado e um relógio dourado.",
    "Para ocasiões especiais: você pode ousar mais com joias statement em dourado ou rosé gold!",
  ],
  encontro: [
    "Para um encontro especial, vamos criar algo romântico! 💕",
    "Um vestido ou blusa em tom lilás suave com detalhes em creme é perfeito.",
    "Complete com acessórios dourados e uma maquiagem que realce seus olhos. Você vai arrasar!",
  ],
  geral: [
    "Baseando-me no seu perfil, vejo que você tem um estilo elegante e sofisticado! ✨",
    "Sua personalidade combina com looks que misturam clássico e moderno.",
    "Lembre-se: a confiança é o melhor acessório que você pode usar! 💫",
  ],
};

function getAIResponse(userMessage: string): Message {
  const message = userMessage.toLowerCase();
  let response = "";
  let suggestions: string[] = [];

  if (message.includes("cor") || message.includes("tons")) {
    response =
      aiResponses.cores[Math.floor(Math.random() * aiResponses.cores.length)];
    suggestions = [
      "Como combinar essas cores?",
      "Que maquiagem usar?",
      "Looks para diferentes ocasiões",
    ];
  } else if (message.includes("trabalho") || message.includes("profissional")) {
    response =
      aiResponses.trabalho[
        Math.floor(Math.random() * aiResponses.trabalho.length)
      ];
    suggestions = [
      "Looks casuais para escritório",
      "Como variar os looks?",
      "Sapatos ideais",
    ];
  } else if (message.includes("acessório") || message.includes("joia")) {
    response =
      aiResponses.acessorios[
        Math.floor(Math.random() * aiResponses.acessorios.length)
      ];
    suggestions = ["Bolsas que combinam", "Óculos de sol", "Lenços e echarpes"];
  } else if (
    message.includes("encontro") ||
    message.includes("date") ||
    message.includes("romântico")
  ) {
    response =
      aiResponses.encontro[
        Math.floor(Math.random() * aiResponses.encontro.length)
      ];
    suggestions = [
      "Maquiagem para encontro",
      "Sapatos confortáveis",
      "Perfumes que combinam",
    ];
  } else {
    response =
      aiResponses.geral[Math.floor(Math.random() * aiResponses.geral.length)];
    suggestions = [
      "Dicas de combinações",
      "Looks para cada estação",
      "Como cuidar das roupas",
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
        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bot className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-xl font-accent font-medium mb-2 tracking-wide">
          Assistente de Estilo IA
        </h3>
        <p className="text-muted-foreground">
          Converse com Luna e receba dicas personalizadas de estilo
        </p>
      </div>

      <Card className="h-[500px] flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageCircle className="w-5 h-5" />
            Chat com Luna
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea ref={scrollAreaRef} className="flex-1 px-4">
            <div className="space-y-4 py-4">
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
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {message.content}

                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs opacity-70">Sugestões:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-2 py-1 bg-background/50 rounded text-xs hover:bg-background/80 transition-colors"
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
                  <div className="bg-muted rounded-lg px-3 py-2 text-sm">
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

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-auto p-4 text-left flex-col items-start"
          onClick={() =>
            handleSuggestionClick("Que cores ficam melhor em mim?")
          }
        >
          <Sparkles className="w-5 h-5 mb-2 text-primary" />
          <span className="font-medium text-sm">Minha Paleta</span>
          <span className="text-xs text-muted-foreground">
            Descubra suas cores ideais
          </span>
        </Button>

        <Button
          variant="outline"
          className="h-auto p-4 text-left flex-col items-start"
          onClick={() =>
            handleSuggestionClick("Como posso criar um look para trabalho?")
          }
        >
          <Heart className="w-5 h-5 mb-2 text-primary" />
          <span className="font-medium text-sm">Look Profissional</span>
          <span className="text-xs text-muted-foreground">
            Dicas para o trabalho
          </span>
        </Button>
      </div>
    </div>
  );
}
