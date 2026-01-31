import { useState, useRef, useEffect } from "react";
import { queryCustomModelApi, fetchCustomModelsApi } from "../../api/customModelApi"; 

function Chat() { 
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState("");
  
  const [models, setModels] = useState([]); 

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // 모델 리스트 가져오기
  useEffect(() => {
    const loadModels = async () => {
      try {
        const data = await fetchCustomModelsApi();
        if (Array.isArray(data)) {
            setModels(data);
        }
      } catch (error) {
        console.error("모델 리스트 로딩 실패:", error);
      }
    };

    loadModels();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!selectedModelId) {
      alert("질문할 모델을 먼저 선택해주세요.");
      return;
    }

    const currentQuestion = input;
    setInput("");

    const userMessage = { role: "user", content: currentQuestion };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const answer = await queryCustomModelApi(selectedModelId, currentQuestion);

      const botMessage = { 
        role: "assistant", 
        content: answer 
      };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage = { 
        role: "assistant", 
        content: `오류가 발생했습니다: ${error.message}` 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
      {/* 상단 바 */}
      <header className="h-14 border-b border-gray-200 flex items-center px-6 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Model</label>
            <select 
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 p-1.5 outline-none cursor-pointer min-w-[200px]"
                value={selectedModelId}
                onChange={(e) => setSelectedModelId(e.target.value)}
            >
                <option value="">
                    {models.length === 0 ? "모델 로딩 중..." : "모델을 선택하세요"}
                </option>
                
                {/* 여기가 핵심 수정 부분입니다 */}
                {models.map((m) => (
                    <option key={m.id} value={m.id} title={m.description}>
                        {m.displayName}
                    </option>
                ))}
            </select>
        </div>
      </header>   

      {/* 채팅 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <div className="py-40 text-center flex flex-col items-center justify-center">
              <h2 className="text-7xl font-black text-gray-200 uppercase tracking-tighter select-none mb-4">
                Rag Craft
              </h2>
              <p className="text-4xl font-bold text-gray-300 tracking-tight">
                무엇이든 물어보세요
              </p>
              <p className="text-gray-400 mt-6 text-lg font-medium">
                {models.length > 0 
                  ? "상단에서 모델을 선택하고 대화를 시작하세요."
                  : "왼쪽 사이드바에서 커스텀 모델을 먼저 생성해주세요."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-5 py-3 rounded-2xl shadow-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user" 
                      ? "bg-blue-600 text-white " 
                      : "bg-gray-100 text-gray-800 border border-gray-200 "
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 text-gray-400 px-5 py-3 rounded-2xl border border-gray-200 animate-pulse">
                    답변을 생성 중입니다...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* 하단 입력창 */}
      <div className="p-6">
        <div className="max-w-3xl mx-auto relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !isTyping && handleSend()}
            placeholder={selectedModelId ? "메시지를 입력하세요..." : "상단에서 모델을 먼저 선택해주세요"}
            disabled={isTyping || !selectedModelId}
            className="w-full p-5 pr-24 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white text-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping || !selectedModelId}
            className="absolute right-4 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 active:scale-95 disabled:bg-gray-300 disabled:shadow-none transition-all shadow-md"
          >
            전송
          </button>
        </div>
      </div>
    </main>
  );
}

export default Chat;