// import React, { useEffect, useRef, useState } from "react";
// import { IoSend } from "react-icons/io5";
// import { FiPaperclip } from "react-icons/fi";
// import './App.css';
// import MermaidChart from "./MermaidChart.tsx";
// import type {StepNode} from "./utils/generateMermaidFromFlow.ts";
// import {generateMermaidFromFlow} from "./utils/generateMermaidFromFlow.ts";
//
// const USER = 'user' as const;
// const BOT = 'bot' as const;
//
// type Sender = typeof USER | typeof BOT;
//
// type Message = {
//     sender: Sender;
//     text: string;
// };
//
// function App() {
//     const [messages, setMessages] = useState<Array<Message>>([
//         // { sender: BOT, text: 'Hello! How can I help you today?' }
//     ]);
//     const [input, setInput] = useState('');
//
//     const bottomRef = useRef<HTMLDivElement | null>(null);
//     const textareaRef = useRef<HTMLTextAreaElement | null>(null);
//
//     // Adjust textarea height dynamically up to max height
//     const adjustTextareaHeight = () => {
//         const textarea = textareaRef.current;
//         if (textarea) {
//             textarea.style.height = "40px";
//             const maxHeight = 100;
//             textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
//         }
//     };
//
//     useEffect(() => {
//         adjustTextareaHeight();
//     }, [input]);
//
//     const scrollToBottom = () => {
//         const el = bottomRef.current;
//         if (el) {
//             el.scrollIntoView({ behavior: 'smooth' });
//         }
//     };
//
//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);
//
//     // const handleSend = () => {
//     //     if (!input.trim()) return;
//     //
//     //     const userMessage: Message = { sender: USER, text: input };
//     //     setMessages((prev) => [...prev, userMessage]);
//     //     setInput("");
//     //
//     //     setTimeout(() => {
//     //         const botMessage: Message = {
//     //             sender: BOT,
//     //             text: "This is sample response",
//     //         };
//     //         setMessages((prev) => [...prev, botMessage]);
//     //     }, 1500);
//     // };
//
//     const handleSend = async () => {
//         if (!input.trim()) return;
//
//         const userMessage: Message = { sender: USER, text: input };
//         setMessages(prev => [...prev, userMessage]);
//         setInput('');
//
//         try {
//             // const data: StepNode[] = [
//             //     {
//             //         "org": "Congress (Joint)",
//             //         "team": "Budget Resolution",
//             //         "actor": "House & Senate Leadership",
//             //         "text": "Adopt budget resolution with reconciliation directives",
//             //         "type": "Start",
//             //         "code": "PR.0",
//             //         "from": null,
//             //         "to": "PR.1"
//             //     },
//             //     {
//             //         "org": "Congress",
//             //         "team": "Committees",
//             //         "actor": "Authorizing & Tax/Spending Committees",
//             //         "text": "Committees draft legislation per reconciliation directives",
//             //         "type": "Step",
//             //         "code": "PR.1",
//             //         "from": "PR.0",
//             //         "to": "PR.2"
//             //     },
//             //     {
//             //         "org": "Congress",
//             //         "team": "Committees",
//             //         "actor": "House & Senate Budget Committees",
//             //         "text": "Assemble recommendations into a single reconciliation bill",
//             //         "type": "Step",
//             //         "code": "PR.2",
//             //         "from": "PR.1",
//             //         "to": "PR.3"
//             //     },
//             //     {
//             //         "org": "Congress",
//             //         "team": "House of Representatives",
//             //         "actor": "Members & Leadership",
//             //         "text": "House considers reconciliation bill (debate, amendments, vote)",
//             //         "type": "Step",
//             //         "code": "PR.3",
//             //         "from": "PR.2",
//             //         "to": "PR.4"
//             //     },
//             //     {
//             //         "org": "Congress",
//             //         "team": "Senate",
//             //         "actor": "Senators & Leadership",
//             //         "text": "Senate considers reconciliation bill (20-hour limit, Byrd Rule, vote)",
//             //         "type": "Step",
//             //         "code": "PR.4",
//             //         "from": "PR.3",
//             //         "to": "PR.5"
//             //     },
//             //     {
//             //         "org": "Congress",
//             //         "team": "House & Senate",
//             //         "actor": "Leadership / Conferees",
//             //         "text": "Do House and Senate pass identical versions?",
//             //         "type": "Decision",
//             //         "code": "PR.5",
//             //         "from": "PR.4",
//             //         "yes": "PR.6",
//             //         "no": "PR.3"
//             //     },
//             //     {
//             //         "org": "Executive Branch",
//             //         "team": "President",
//             //         "actor": "President",
//             //         "text": "Sign reconciliation bill into law",
//             //         "type": "End",
//             //         "code": "PR.6",
//             //         "from": "PR.5",
//             //         "to": null
//             //     }
//             // ]
//
//             const data = [
//                 {"org": "Congress", "team": "House & Senate", "actor": "Members", "text": "Adopt a budget resolution with reconciliation directives", "type": "STEP", "code": "PR.1", "from": null, "to": "PR.2"},
//                 {"org": "Congress", "team": "House & Senate", "actor": "Members", "text": "Decide whether to include reconciliation directives", "type": "DECISION", "code": "PR.2", "from": "PR.1", "yes": "PR.3", "no": null},
//                 {"org": "Congress", "team": "Committees", "actor": "Specified Committees", "text": "Prepare and report legislation by a deadline to meet reconciliation targets", "type": "STEP", "code": "PR.3", "from": "PR.2", "to": "PR.4"},
//                 {"org": "Congress", "team": "Committees", "actor": "Committees", "text": "Vote on legislation to implement part of the package", "type": "STEP", "code": "PR.4", "from": "PR.3", "to": "PR.5"},
//                 {"org": "Congress", "team": "Committees", "actor": "Committees", "text": "Committee fails to act or falls short of target?", "type": "DECISION", "code": "PR.5", "from": "PR.4", "yes": "PR.6", "no": "PR.7"},
//                 {"org": "Congress", "team": "Budget Committee", "actor": "Budget Committee Chair", "text": "Offer floor amendments to meet reconciliation target", "type": "STEP", "code": "PR.6", "from": "PR.5", "to": "PR.7"},
//                 {"org": "Congress", "team": "Senate", "actor": "Senate Leadership", "text": "Optionally bypass formal committee process and take House-passed reconciliation bill directly to the floor", "type": "DECISION", "code": "PR.7", "from": "PR.6", "yes": "PR.8", "no": "PR.9"},
//                 {"org": "Congress", "team": "Budget Committees", "actor": "House & Senate Budget Committees", "text": "Assemble committee recommendations into omnibus reconciliation bill", "type": "STEP", "code": "PR.8", "from": "PR.7", "to": "PR.9"},
//                 {"org": "Congress", "team": "House or Senate", "actor": "Full Chamber", "text": "Consider reconciliation bill on chamber floor", "type": "STEP", "code": "PR.9", "from": "PR.8", "to": "PR.10"},
//                 {"org": "Congress", "team": "House or Senate", "actor": "Members", "text": "Offer amendments during floor consideration", "type": "STEP", "code": "PR.10", "from": "PR.9", "to": "PR.11"},
//                 {"org": "Congress", "team": "House", "actor": "Rules Committee", "text": "Adopt a special rule specifying debate time and allowed amendments", "type": "STEP", "code": "PR.11", "from": "PR.10", "to": "PR.12"},
//                 {"org": "Congress", "team": "Senate", "actor": "Senators", "text": "Debate reconciliation bill for up to 20 hours", "type": "STEP", "code": "PR.12", "from": "PR.11", "to": "PR.13"},
//                 {"org": "Congress", "team": "Senate", "actor": "Senators", "text": "Proceed to vote-a-rama on remaining amendments with little or no debate", "type": "STEP", "code": "PR.13", "from": "PR.12", "to": "PR.14"},
//                 {"org": "Congress", "team": "Senate", "actor": "Senators", "text": "Raise Byrd Rule points of order against extraneous provisions", "type": "DECISION", "code": "PR.14", "from": "PR.13", "yes": "PR.15", "no": "PR.16"},
//                 {"org": "Congress", "team": "Senate", "actor": "Presiding Officer", "text": "Sustain Byrd Rule objection and delete extraneous provisions", "type": "STEP", "code": "PR.15", "from": "PR.14", "to": "PR.16"},
//                 {"org": "Congress", "team": "Senate", "actor": "Senators", "text": "Vote to waive Byrd Rule with three-fifths majority", "type": "DECISION", "code": "PR.16", "from": "PR.15", "yes": "PR.17", "no": "PR.15"},
//                 {"org": "Congress", "team": "House & Senate", "actor": "Members", "text": "House and Senate pass different versions of reconciliation bill?", "type": "DECISION", "code": "PR.17", "from": "PR.16", "yes": "PR.18", "no": "PR.19"},
//                 {"org": "Congress", "team": "House & Senate", "actor": "Conference Committee", "text": "Negotiate compromise via conference committee or amendment exchange", "type": "STEP", "code": "PR.18", "from": "PR.17", "to": "PR.19"},
//                 {"org": "Congress", "team": "House & Senate", "actor": "Members", "text": "Vote on final compromise version", "type": "STEP", "code": "PR.19", "from": "PR.18", "to": "PR.20"},
//                 {"org": null, "team": null, "actor": "President", "text": "Sign reconciliation bill into law?", "type": "DECISION", "code": "PR.20", "from": "PR.19", "yes": null, "no": "PR.21"},
//                 {"org": null, "team": null, "actor": "President", "text": "Veto reconciliation bill", "type": "STEP", "code": "PR.21", "from": "PR.20", "to": "PR.22"},
//                 {"org": "Congress", "team": "House & Senate", "actor": "Members", "text": "Attempt to override veto", "type": "DECISION", "code": "PR.22", "from": "PR.21", "yes": null, "no": "PR.23"},
//                 {"org": "Congress", "team": "House & Senate", "actor": "Members", "text": "If veto sustained, adopt or revise budget resolution to restart reconciliation process", "type": "STEP", "code": "PR.23", "from": "PR.22", "to": "PR.1"},
//             ]
//
//             const mermaidChart = generateMermaidFromFlow(data as StepNode[]);
//
//             const botMessage: Message = {
//                 sender: BOT,
//                 text: `mermaid:\n${mermaidChart}`
//             };
//
//             setMessages(prev => [...prev, botMessage]);
//         } catch (err: unknown) {
//             const botMessage: Message = {
//                 sender: BOT,
//                 text: `Sorry, I couldn't fetch the flowchart. ${err}`
//             };
//             setMessages(prev => [...prev, botMessage]);
//         }
//     };
//
//     const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setInput(e.target.value);
//     };
//
//     const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             handleSend();
//         }
//     };
//
//     return (
//         <div
//             className="flex flex-col h-screen bg-gradient-to-br from-[#dbeafe] via-[#e0e7ff] to-[#c7d2fe] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors"
//         >
//             <header className="absolute p-4 backdrop-blur top-0 z-10 border-gray-200 dark:border-gray-700">
//                 <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
//                     Oecora Assistant
//                 </h1>
//             </header>
//
//
//             <main className="flex-1 overflow-y-auto px-4 py-6">
//                 <div className="mx-auto space-y-4">
//                     {/*{messages.map((msg, idx) => (*/}
//                     {/*    <div*/}
//                     {/*        key={idx}*/}
//                     {/*        className={`chat chat-fade-in ${msg.sender === USER ? 'chat-end' : 'chat-start'}`}*/}
//                     {/*    >*/}
//                     {/*        <div*/}
//                     {/*            className={`max-w-full px-4 py-3 whitespace-pre-wrap rounded-2xl shadow-md transition-all select-text ${*/}
//                     {/*                msg.sender === USER*/}
//                     {/*                    ? 'bg-blue-600 text-white'*/}
//                     {/*                    : 'bg-white/20 dark:bg-gray-700/40 text-gray-900 dark:text-gray-100 backdrop-blur-sm'*/}
//                     {/*            }`}*/}
//                     {/*            style={{maxWidth: '600px'}}*/}
//                     {/*        >*/}
//                     {/*            {msg.text}*/}
//                     {/*        </div>*/}
//                     {/*    </div>*/}
//                     {/*))}*/}
//
//                     {messages.map((msg, idx) => (
//                         <div
//                             key={idx}
//                             className={`chat chat-fade-in ${msg.sender === USER ? 'chat-end' : 'chat-'}`}
//                         >
//                             <div
//                                 className={`max-w-full px-4 py-3 whitespace-pre-wrap rounded-2xl shadow-md transition-all select-text ${
//                                     msg.sender === USER
//                                         ? 'bg-blue-600 text-white'
//                                         : 'bg-white/20 dark:bg-gray-700/40 text-gray-900 dark:text-gray-100 backdrop-blur-sm'
//                                 }`}
//                             >
//                                 {msg.text.startsWith('mermaid:') ? (
//                                     <MermaidChart chart={msg.text.replace(/^mermaid:\s*/, '')} />
//                                 ) : (
//                                     msg.text
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                     <div ref={bottomRef}/>
//                 </div>
//             </main>
//
//             <footer className="p-4 bg-transparent">
//                 <div
//                     className="max-w-3xl mx-auto w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 shadow-md transition flex flex-col gap-2"
//                 >
//                     <textarea
//                         ref={textareaRef}
//                         placeholder="Message Oecora..."
//                         className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-2 resize-none overflow-y-auto"
//                         style={{minHeight: '40px', maxHeight: '100px'}}
//                         value={input}
//                         onChange={handleInputChange}
//                         onKeyDown={handleKeyDown}
//                         rows={1}
//                         cols={50}
//                     />
//
//                     <div className="flex justify-between items-center">
//                         <button
//                             className="flex items-center text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 p-1.5 rounded-full transition space-x-1"
//                         >
//                             <FiPaperclip size={20}/>
//                             <span className="select-none">Attach</span>
//                         </button>
//
//                         <button
//                             onClick={handleSend}
//                             className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition"
//                         >
//                             <IoSend size={18}/>
//                         </button>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// }
//
// export default App;
//


// function App() {
//     return (
//         <div className="drawer lg:drawer-open">
//             <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
//             {/* Main content area */}
//             <div className="drawer-content flex flex-col">
//                 {/* Top navigation bar for mobile */}
//                 <div className="navbar bg-base-300 lg:hidden">
//                     <div className="flex-none">
//                         <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 className="inline-block w-6 h-6 stroke-current"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 6h16M4 12h16M4 18h16"
//                                 ></path>
//                             </svg>
//                         </label>
//                     </div>
//                     <div className="flex-1">
//                         <h1 className="text-xl font-semibold">Oecora</h1>
//                     </div>
//                 </div>

//                 {/* Main content */}
//                 <main className="flex-1 p-6 bg-base-100">
//                     <div className="max-w-4xl mx-auto">
//                         <div className="mb-8">
//                             <h1 className="text-3xl font-bold text-base-content mb-2">
//                                 Welcome to Oecora
//                             </h1>
//                             <p className="text-base-content/70">
//                                 This is your main content area. Start building your application here.
//                             </p>
//                         </div>

//                         {/* Content cards */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             <div className="card bg-base-200 shadow-xl">
//                                 <div className="card-body">
//                                     <h2 className="card-title">Card 1</h2>
//                                     <p>Some content for your first card.</p>
//                                     <div className="card-actions justify-end">
//                                         <button className="btn btn-primary">Action</button>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="card bg-base-200 shadow-xl">
//                                 <div className="card-body">
//                                     <h2 className="card-title">Card 2</h2>
//                                     <p>Some content for your second card.</p>
//                                     <div className="card-actions justify-end">
//                                         <button className="btn btn-primary">Action</button>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="card bg-base-200 shadow-xl">
//                                 <div className="card-body">
//                                     <h2 className="card-title">Card 3</h2>
//                                     <p>Some content for your third card.</p>
//                                     <div className="card-actions justify-end">
//                                         <button className="btn btn-primary">Action</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Additional content section */}
//                         <div className="mt-12">
//                             <div className="prose max-w-none">
//                                 <h2>Content Section</h2>
//                                 <p>
//                                     This layout provides you with a responsive sidebar navigation and a main content area.
//                                     The sidebar automatically shows on large screens and can be toggled on mobile devices.
//                                 </p>
//                                 <p>
//                                     You can customize the sidebar items, add routing, and populate this main area with
//                                     your application content.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="max-w-4xl mx-auto">
//                         <div className="mb-8">
//                             <h1 className="text-3xl font-bold text-base-content mb-2">
//                                 Welcome to Oecora
//                             </h1>
//                             <p className="text-base-content/70">
//                                 This is your main content area. Start building your application here.
//                             </p>
//                         </div>

//                         {/* Content cards */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             <div className="card bg-base-200 shadow-xl">
//                                 <div className="card-body">
//                                     <h2 className="card-title">Card 1</h2>
//                                     <p>Some content for your first card.</p>
//                                     <div className="card-actions justify-end">
//                                         <button className="btn btn-primary">Action</button>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="card bg-base-200 shadow-xl">
//                                 <div className="card-body">
//                                     <h2 className="card-title">Card 2</h2>
//                                     <p>Some content for your second card.</p>
//                                     <div className="card-actions justify-end">
//                                         <button className="btn btn-primary">Action</button>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="card bg-base-200 shadow-xl">
//                                 <div className="card-body">
//                                     <h2 className="card-title">Card 3</h2>
//                                     <p>Some content for your third card.</p>
//                                     <div className="card-actions justify-end">
//                                         <button className="btn btn-primary">Action</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Additional content section */}
//                         <div className="mt-12">
//                             <div className="prose max-w-none">
//                                 <h2>Content Section</h2>
//                                 <p>
//                                     This layout provides you with a responsive sidebar navigation and a main content area.
//                                     The sidebar automatically shows on large screens and can be toggled on mobile devices.
//                                 </p>
//                                 <p>
//                                     You can customize the sidebar items, add routing, and populate this main area with
//                                     your application content.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="max-w-4xl mx-auto">
//                         <div className="mb-8">
//                             <h1 className="text-3xl font-bold text-base-content mb-2">
//                                 Welcome to Oecora
//                             </h1>
//                             <p className="text-base-content/70">
//                                 This is your main content area. Start building your application here.
//                             </p>
//                         </div>

//                         {/* Content cards */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             <div className="card bg-base-200 shadow-xl">
//                                 <div className="card-body">
//                                     <h2 className="card-title">Card 1</h2>
//                                     <p>Some content for your first card.</p>
//                                     <div className="card-actions justify-end">
//                                         <button className="btn btn-primary">Action</button>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="card bg-base-200 shadow-xl">
//                                 <div className="card-body">
//                                     <h2 className="card-title">Card 2</h2>
//                                     <p>Some content for your second card.</p>
//                                     <div className="card-actions justify-end">
//                                         <button className="btn btn-primary">Action</button>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="card bg-base-200 shadow-xl">
//                                 <div className="card-body">
//                                     <h2 className="card-title">Card 3</h2>
//                                     <p>Some content for your third card.</p>
//                                     <div className="card-actions justify-end">
//                                         <button className="btn btn-primary">Action</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Additional content section */}
//                         <div className="mt-12">
//                             <div className="prose max-w-none">
//                                 <h2>Content Section</h2>
//                                 <p>
//                                     This layout provides you with a responsive sidebar navigation and a main content area.
//                                     The sidebar automatically shows on large screens and can be toggled on mobile devices.
//                                 </p>
//                                 <p>
//                                     You can customize the sidebar items, add routing, and populate this main area with
//                                     your application content.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="max-w-4xl mx-auto">
//                         <div className="mb-8">
//                             <h1 className="text-3xl font-bold text-base-content mb-2">
//                                 Welcome to Oecora
//                             </h1>
//                             <p className="text-base-content/70">
//                                 This is your main content area. Start building your application here.
//                             </p>
//                         </div>

//                         {/* Content cards */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             <div className="card bg-base-200 shadow-xl">
//                                 <div className="card-body">
//                                     <h2 className="card-title">Card 1</h2>
//                                     <p>Some content for your first card.</p>
//                                     <div className="card-actions justify-end">
//                                         <button className="btn btn-primary">Action</button>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="card bg-base-200 shadow-xl">
//                                 <div className="card-body">
//                                     <h2 className="card-title">Card 2</h2>
//                                     <p>Some content for your second card.</p>
//                                     <div className="card-actions justify-end">
//                                         <button className="btn btn-primary">Action</button>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="card bg-base-200 shadow-xl">
//                                 <div className="card-body">
//                                     <h2 className="card-title">Card 3</h2>
//                                     <p>Some content for your third card.</p>
//                                     <div className="card-actions justify-end">
//                                         <button className="btn btn-primary">Action</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Additional content section */}
//                         <div className="mt-12">
//                             <div className="prose max-w-none">
//                                 <h2>Content Section</h2>
//                                 <p>
//                                     This layout provides you with a responsive sidebar navigation and a main content area.
//                                     The sidebar automatically shows on large screens and can be toggled on mobile devices.
//                                 </p>
//                                 <p>
//                                     You can customize the sidebar items, add routing, and populate this main area with
//                                     your application content.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="max-w-4xl mx-auto">
//                         <div className="mb-8">
//                             <h1 className="text-3xl font-bold text-base-content mb-2">
//                                 Welcome to Oecora
//                             </h1>
//                             <p className="text-base-content/70">
//                                 This is your main content area. Start building your application here.
//                             </p>
//                         </div>

//                         {/* Content cards */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             <div className="card bg-base-200 shadow-xl">
//                                 <div className="card-body">
//                                     <h2 className="card-title">Card 1</h2>
//                                     <p>Some content for your first card.</p>
//                                     <div className="card-actions justify-end">
//                                         <button className="btn btn-primary">Action</button>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="card bg-base-200 shadow-xl">
//                                 <div className="card-body">
//                                     <h2 className="card-title">Card 2</h2>
//                                     <p>Some content for your second card.</p>
//                                     <div className="card-actions justify-end">
//                                         <button className="btn btn-primary">Action</button>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="card bg-base-200 shadow-xl">
//                                 <div className="card-body">
//                                     <h2 className="card-title">Card 3</h2>
//                                     <p>Some content for your third card.</p>
//                                     <div className="card-actions justify-end">
//                                         <button className="btn btn-primary">Action</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Additional content section */}
//                         <div className="mt-12">
//                             <div className="prose max-w-none">
//                                 <h2>Content Section</h2>
//                                 <p>
//                                     This layout provides you with a responsive sidebar navigation and a main content area.
//                                     The sidebar automatically shows on large screens and can be toggled on mobile devices.
//                                 </p>
//                                 <p>
//                                     You can customize the sidebar items, add routing, and populate this main area with
//                                     your application content.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//             </div>

//             {/* Sidebar */}
//             <div className="drawer-side">
//                 <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
//                 <aside className="min-h-full w-64 bg-base-200 text-base-content">
//                     {/* Sidebar header */}
//                     <div className="p-4 border-b border-base-300">
//                         <h2 className="text-lg font-semibold">Navigation</h2>
//                     </div>
                    
//                     {/* Navigation menu */}
//                     <ul className="menu p-4 space-y-1">
//                         <li>
//                             <a className="flex items-center space-x-3">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
//                                 </svg>
//                                 <span>Dashboard</span>
//                             </a>
//                         </li>
//                         <li>
//                             <a className="flex items-center space-x-3">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                                 </svg>
//                                 <span>Analytics</span>
//                             </a>
//                         </li>
//                         <li>
//                             <a className="flex items-center space-x-3">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//                                 </svg>
//                                 <span>Users</span>
//                             </a>
//                         </li>
//                         <li>
//                             <a className="flex items-center space-x-3">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                 </svg>
//                                 <span>Documents</span>
//                             </a>
//                         </li>
//                         <li>
//                             <a className="flex items-center space-x-3">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                 </svg>
//                                 <span>Settings</span>
//                             </a>
//                         </li>
//                     </ul>

//                     {/* Sidebar footer */}
//                     <div className="mt-auto p-4 border-t border-base-300">
//                         <div className="flex items-center space-x-3">
//                             <div className="avatar placeholder">
//                                 <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
//                                     <span className="text-xs">U</span>
//                                 </div>
//                             </div>
//                             <div className="flex-1 min-w-0">
//                                 <p className="text-sm font-medium truncate">User Name</p>
//                                 <p className="text-xs text-base-content/60 truncate">user@example.com</p>
//                             </div>
//                         </div>
//                     </div>
//                 </aside>
//             </div>
//         </div>
//     );
// }

// export default App;


// const XMLResponse = `
// <mxfile host="app.diagrams.net" agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36" version="28.1.2">
//   <diagram id="07fea595-8f29-1299-0266-81d95cde20df" name="Page-1">
//     <mxGraphModel dx="1214" dy="867" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" background="#ffffff" math="0" shadow="0">
//       <root>
//         <mxCell id="0" />
//         <mxCell id="1" parent="0" />
//         <mxCell id="eHIFP4p37Z23MNbaOak_-313" value="&lt;font color=&quot;#23497d&quot;&gt;Inside Sales Rep&lt;/font&gt;" style="swimlane;whiteSpace=wrap;fillColor=none;swimlaneFillColor=#BAC8D3;fontColor=#2F5B7C;fontFamily=Tahoma;html=1;strokeColor=none;opacity=50;" vertex="1" parent="1">
//           <mxGeometry x="250" y="210" width="160" height="650" as="geometry">
//             <mxRectangle x="20" y="20" width="80" height="23" as="alternateBounds" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-314" value="Customer Management" style="whiteSpace=wrap;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;plain-purple;strokeColor=none;fillColor=#2f5b7c;gradientColor=none;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-313">
//           <mxGeometry x="20" y="60" width="120" height="60" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-315" value="Credit Management" style="whiteSpace=wrap;strokeColor=none;fillColor=#2f5b7c;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-313">
//           <mxGeometry x="20" y="375" width="120" height="60" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-316" value="Price Management" style="whiteSpace=wrap;strokeColor=none;fillColor=#2f5b7c;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-313">
//           <mxGeometry x="20" y="485" width="120" height="60" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-317" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="eHIFP4p37Z23MNbaOak_-313" source="eHIFP4p37Z23MNbaOak_-315" target="eHIFP4p37Z23MNbaOak_-316">
//           <mxGeometry width="100" height="100" relative="1" as="geometry">
//             <mxPoint x="170" y="397.5" as="sourcePoint" />
//             <mxPoint x="270" y="472.5" as="targetPoint" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-318" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="eHIFP4p37Z23MNbaOak_-313" source="eHIFP4p37Z23MNbaOak_-314" target="eHIFP4p37Z23MNbaOak_-315">
//           <mxGeometry width="100" height="100" relative="1" as="geometry">
//             <mxPoint x="160" y="110" as="sourcePoint" />
//             <mxPoint x="260" y="185" as="targetPoint" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-319" value="&lt;font color=&quot;#23497d&quot;&gt;Inside Sales Manager&lt;/font&gt;" style="swimlane;whiteSpace=wrap;fillColor=none;swimlaneFillColor=#BAC8D3;fontColor=#2F5B7C;fontFamily=Tahoma;html=1;strokeColor=none;opacity=25;" vertex="1" parent="1">
//           <mxGeometry x="1050" y="210" width="160" height="650" as="geometry">
//             <mxRectangle x="20" y="20" width="80" height="23" as="alternateBounds" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-320" value="Sales Contract" style="shape=document;whiteSpace=wrap;verticalAlign=middle;strokeColor=none;fillColor=#12aab5;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;spacingBottom=22;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-319">
//           <mxGeometry x="20" y="50" width="120" height="80" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-321" value="Bills" style="shape=document;whiteSpace=wrap;verticalAlign=middle;strokeColor=none;fillColor=#12aab5;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;spacingBottom=22;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-319">
//           <mxGeometry x="20" y="530" width="120" height="80" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-322" value="Cost Allocation" style="whiteSpace=wrap;strokeColor=none;fillColor=#2f5b7c;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-319">
//           <mxGeometry x="20" y="305" width="120" height="60" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-323" value="&lt;font color=&quot;#23497d&quot;&gt;VP Sales&lt;/font&gt;" style="swimlane;whiteSpace=wrap;fillColor=none;swimlaneFillColor=#BAC8D3;fontColor=#2F5B7C;fontFamily=Tahoma;html=1;strokeColor=none;opacity=50;" vertex="1" parent="1">
//           <mxGeometry x="890" y="210" width="160" height="650" as="geometry">
//             <mxRectangle x="20" y="20" width="80" height="23" as="alternateBounds" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-324" value="Outbound Accounting" style="whiteSpace=wrap;fillColor=#2f5b7c;strokeColor=none;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-323">
//           <mxGeometry x="20" y="160" width="120" height="60" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-325" value="Account Processing" style="whiteSpace=wrap;strokeColor=none;fillColor=#2f5b7c;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-323">
//           <mxGeometry x="20" y="420" width="120" height="60" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-326" value="&lt;font color=&quot;#23497d&quot;&gt;Sales Admin&lt;/font&gt;" style="swimlane;whiteSpace=wrap;fillColor=none;swimlaneFillColor=#BAC8D3;fontColor=#2F5B7C;fontFamily=Tahoma;html=1;strokeColor=none;opacity=25;" vertex="1" parent="1">
//           <mxGeometry x="410" y="210" width="160" height="650" as="geometry">
//             <mxRectangle x="20" y="20" width="80" height="23" as="alternateBounds" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-327" value="Material Requirements Planning Operation" style="whiteSpace=wrap;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;plain-purple;strokeColor=none;fillColor=#2f5b7c;gradientColor=none;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-326">
//           <mxGeometry x="20" y="165" width="120" height="60" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-328" value="&lt;font color=&quot;#ffffff&quot;&gt;Facilities Procurement&lt;br&gt;Application&lt;/font&gt;&lt;br&gt; " style="shape=document;whiteSpace=wrap;verticalAlign=middle;strokeColor=none;fillColor=#12aab5;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;spacingBottom=22;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-326">
//           <mxGeometry x="20" y="265" width="120" height="80" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-329" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="eHIFP4p37Z23MNbaOak_-326" source="eHIFP4p37Z23MNbaOak_-327" target="eHIFP4p37Z23MNbaOak_-328">
//           <mxGeometry width="100" height="100" relative="1" as="geometry">
//             <mxPoint x="-10" y="100" as="sourcePoint" />
//             <mxPoint x="90" y="175" as="targetPoint" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-330" value="&lt;font color=&quot;#23497d&quot;&gt;Sales Representative&lt;/font&gt;" style="swimlane;whiteSpace=wrap;fillColor=none;swimlaneFillColor=#BAC8D3;fontColor=#2F5B7C;fontFamily=Tahoma;html=1;strokeColor=none;opacity=50;" vertex="1" parent="1">
//           <mxGeometry x="570" y="210" width="160" height="650" as="geometry">
//             <mxRectangle x="20" y="20" width="80" height="23" as="alternateBounds" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-331" value="Product Quotations" style="shape=document;whiteSpace=wrap;verticalAlign=middle;strokeColor=none;fillColor=#12aab5;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;spacingBottom=22;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-330">
//           <mxGeometry x="20" y="50" width="120" height="80" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-332" value="Orders" style="shape=document;whiteSpace=wrap;verticalAlign=middle;strokeColor=none;fillColor=#12aab5;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;spacingBottom=22;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-330">
//           <mxGeometry x="20" y="225" width="120" height="80" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-333" value="Product Delivery Notification" style="shape=document;whiteSpace=wrap;strokeColor=none;fillColor=#12aab5;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;verticalAlign=middle;spacing=6;spacingBottom=22;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-330">
//           <mxGeometry x="20" y="400" width="120" height="80" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-334" value="Invoice" style="shape=document;whiteSpace=wrap;verticalAlign=middle;strokeColor=none;fillColor=#12aab5;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;spacingBottom=22;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-330">
//           <mxGeometry x="20" y="520" width="120" height="80" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-335" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#12AAB5;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="eHIFP4p37Z23MNbaOak_-330" source="eHIFP4p37Z23MNbaOak_-333" target="eHIFP4p37Z23MNbaOak_-334">
//           <mxGeometry width="100" height="100" relative="1" as="geometry">
//             <mxPoint x="-80" y="375" as="sourcePoint" />
//             <mxPoint x="60" y="490" as="targetPoint" />
//             <Array as="points">
//               <mxPoint x="53" y="501" />
//               <mxPoint x="53" y="501" />
//             </Array>
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-336" value="&lt;font color=&quot;#23497d&quot;&gt;Sales Manager&lt;/font&gt;" style="swimlane;whiteSpace=wrap;fillColor=none;swimlaneFillColor=#BAC8D3;fontColor=#2F5B7C;fontFamily=Tahoma;html=1;strokeColor=none;opacity=25;" vertex="1" parent="1">
//           <mxGeometry x="730" y="210" width="160" height="650" as="geometry">
//             <mxRectangle x="20" y="20" width="80" height="23" as="alternateBounds" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-337" value="Inventory Control" style="whiteSpace=wrap;strokeColor=none;fillColor=#2f5b7c;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-336">
//           <mxGeometry x="20" y="160" width="120" height="60" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-338" value="Product Delivery" style="whiteSpace=wrap;strokeColor=none;fillColor=#2f5b7c;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-336">
//           <mxGeometry x="20" y="315" width="120" height="60" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-339" value="Director" style="swimlane;whiteSpace=wrap;fillColor=none;swimlaneFillColor=#BAC8D3;fontColor=#2F5B7C;fontFamily=Tahoma;html=1;strokeColor=none;opacity=50;" vertex="1" parent="1">
//           <mxGeometry x="1210" y="210" width="160" height="650" as="geometry">
//             <mxRectangle x="20" y="20" width="80" height="23" as="alternateBounds" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-340" value="Outbounding Management" style="shape=document;whiteSpace=wrap;verticalAlign=middle;strokeColor=none;fillColor=#12aab5;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;spacingBottom=22;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-339">
//           <mxGeometry x="20" y="130" width="120" height="80" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-341" value="Resources Allocation" style="whiteSpace=wrap;strokeColor=none;fillColor=#2f5b7c;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-339">
//           <mxGeometry x="20" y="255" width="120" height="60" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-342" value="Long Term Strategy" style="whiteSpace=wrap;strokeColor=none;fillColor=#2f5b7c;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-339">
//           <mxGeometry x="20" y="400" width="120" height="60" as="geometry" />
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-343" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="eHIFP4p37Z23MNbaOak_-339" source="eHIFP4p37Z23MNbaOak_-341" target="eHIFP4p37Z23MNbaOak_-342">
//           <mxGeometry width="100" height="100" relative="1" as="geometry">
//             <mxPoint x="30" y="570" as="sourcePoint" />
//             <mxPoint x="130" y="470" as="targetPoint" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-344" value="" style="edgeStyle=segmentEdgeStyle;entryX=0.25;entryY=0;strokeColor=#12AAB5;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="eHIFP4p37Z23MNbaOak_-339" source="eHIFP4p37Z23MNbaOak_-340" target="eHIFP4p37Z23MNbaOak_-341">
//           <mxGeometry width="100" height="100" relative="1" as="geometry">
//             <mxPoint x="-120" y="260" as="sourcePoint" />
//             <mxPoint x="-20" y="160" as="targetPoint" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-345" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-314" target="eHIFP4p37Z23MNbaOak_-327">
//           <mxGeometry x="164.5" y="178.5" width="100" height="100" as="geometry">
//             <mxPoint x="450" y="370" as="sourcePoint" />
//             <mxPoint x="550" y="270" as="targetPoint" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-346" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#12AAB5;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-328" target="eHIFP4p37Z23MNbaOak_-315">
//           <mxGeometry x="164.5" y="433.5" width="100" height="100" as="geometry">
//             <mxPoint x="500" y="445" as="sourcePoint" />
//             <mxPoint x="500" y="485" as="targetPoint" />
//             <Array as="points">
//               <mxPoint x="460" y="615" />
//             </Array>
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-347" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-314" target="eHIFP4p37Z23MNbaOak_-331">
//           <mxGeometry x="164.5" y="178.5" width="100" height="100" as="geometry">
//             <mxPoint x="400" y="310" as="sourcePoint" />
//             <mxPoint x="500" y="385" as="targetPoint" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-348" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#12AAB5;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-328" target="eHIFP4p37Z23MNbaOak_-333">
//           <mxGeometry x="234.5" y="433.5" width="100" height="100" as="geometry">
//             <mxPoint x="610" y="940" as="sourcePoint" />
//             <mxPoint x="710" y="840" as="targetPoint" />
//             <Array as="points">
//               <mxPoint x="460" y="650" />
//             </Array>
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-349" value="" style="edgeStyle=elbowEdgeStyle;elbow=vertical;strokeColor=#12AAB5;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-334" target="eHIFP4p37Z23MNbaOak_-321">
//           <mxGeometry x="484.5" y="623.5" width="100" height="100" as="geometry">
//             <mxPoint x="770" y="740" as="sourcePoint" />
//             <mxPoint x="870" y="640" as="targetPoint" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-350" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-327" target="eHIFP4p37Z23MNbaOak_-332">
//           <mxGeometry x="324.5" y="283.5" width="100" height="100" as="geometry">
//             <mxPoint x="680" y="420" as="sourcePoint" />
//             <mxPoint x="780" y="320" as="targetPoint" />
//             <Array as="points" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-351" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#12AAB5;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-331" target="eHIFP4p37Z23MNbaOak_-337">
//           <mxGeometry x="484.5" y="178.5" width="100" height="100" as="geometry">
//             <mxPoint x="670" y="370" as="sourcePoint" />
//             <mxPoint x="770" y="270" as="targetPoint" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-352" value="" style="edgeStyle=none;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-337" target="eHIFP4p37Z23MNbaOak_-324">
//           <mxGeometry x="644.5" y="278.5" width="100" height="100" as="geometry">
//             <mxPoint x="910" y="580" as="sourcePoint" />
//             <mxPoint x="1010" y="480" as="targetPoint" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-353" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#12AAB5;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-332" target="eHIFP4p37Z23MNbaOak_-338">
//           <mxGeometry x="404.5" y="393.5" width="100" height="100" as="geometry">
//             <mxPoint x="750" y="610" as="sourcePoint" />
//             <mxPoint x="850" y="510" as="targetPoint" />
//             <Array as="points">
//               <mxPoint x="630" y="560" />
//             </Array>
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-354" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-338" target="eHIFP4p37Z23MNbaOak_-324">
//           <mxGeometry x="644.5" y="308.5" width="100" height="100" as="geometry">
//             <mxPoint x="870" y="560" as="sourcePoint" />
//             <mxPoint x="970" y="460" as="targetPoint" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-355" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-338" target="eHIFP4p37Z23MNbaOak_-325">
//           <mxGeometry x="644.5" y="433.5" width="100" height="100" as="geometry">
//             <mxPoint x="740" y="710" as="sourcePoint" />
//             <mxPoint x="840" y="610" as="targetPoint" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-356" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-324" target="eHIFP4p37Z23MNbaOak_-320">
//           <mxGeometry x="744.5" y="178.5" width="100" height="100" as="geometry">
//             <mxPoint x="1090" y="500" as="sourcePoint" />
//             <mxPoint x="1190" y="400" as="targetPoint" />
//             <Array as="points">
//               <mxPoint x="970" y="300" />
//             </Array>
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-357" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-324" target="eHIFP4p37Z23MNbaOak_-322">
//           <mxGeometry x="804.5" y="278.5" width="100" height="100" as="geometry">
//             <mxPoint x="1080" y="510" as="sourcePoint" />
//             <mxPoint x="1180" y="410" as="targetPoint" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-358" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-325" target="eHIFP4p37Z23MNbaOak_-321">
//           <mxGeometry x="804.5" y="538.5" width="100" height="100" as="geometry">
//             <mxPoint x="1110" y="700" as="sourcePoint" />
//             <mxPoint x="1210" y="600" as="targetPoint" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-359" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-322" target="eHIFP4p37Z23MNbaOak_-342">
//           <mxGeometry x="964.5" y="423.5" width="100" height="100" as="geometry">
//             <mxPoint x="1320" y="620" as="sourcePoint" />
//             <mxPoint x="1420" y="520" as="targetPoint" />
//           </mxGeometry>
//         </mxCell>
//         <mxCell id="eHIFP4p37Z23MNbaOak_-360" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#12AAB5;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-320" target="eHIFP4p37Z23MNbaOak_-340">
//           <mxGeometry x="964.5" y="178.5" width="100" height="100" as="geometry">
//             <mxPoint x="1080" y="470" as="sourcePoint" />
//             <mxPoint x="1180" y="370" as="targetPoint" />
//           </mxGeometry>
//         </mxCell>
//       </root>
//     </mxGraphModel>
//   </diagram>
// </mxfile>
// `


import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HiHome, HiChatAlt2, HiColorSwatch, HiX } from 'react-icons/hi';
import { IoSend } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import DrawioChart from "./DrawioChart";
import Canva from "./Canva";

const Home = () => (
    <div className="flex flex-col h-[calc(100vh-3rem)] bg-white">
        <main className="flex-1 overflow-y-auto px-4 py-6 bg-white">
            <div className="mx-auto max-w-4xl space-y-4">
                <div className="text-center py-12">
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
                            <span className="text-white text-4xl font-bold">O</span>
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold text-black mb-4">Oecora</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        This is dummy sub heading for the home page.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <Link to="/chat" className="card bg-white border border-gray-200 shadow-lg p-8 cursor-pointer">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                                <HiChatAlt2 className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-black">Chat</h3>
                        </div>
                        <p className="text-gray-700">
                            AI chatbot for your queries.
                        </p>
                    </Link>
                    
                    <Link to="/canvas" className="card bg-white border border-gray-200 shadow-lg p-8 cursor-pointer">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                                <HiColorSwatch className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-black">Canvas</h3>
                        </div>
                        <p className="text-gray-700">
                            Create and share your own canvas.
                        </p>
                    </Link>
                </div>
            </div>
        </main>
    </div>

);


interface ChatApiResponse {
    type: 'question' | 'document'
    session_id: string;
    answer?: string;
    outputXml?: string;
}

const Chat = () => {
    const USER = 'user' as const;
    const BOT = 'bot' as const;
    
    type Sender = typeof USER | typeof BOT;
    
    type Message = {
        sender: Sender;
        text: string;
        xmlOutput?: string;
    };

    const [messages, setMessages] = useState<Array<Message>>([
        { sender: BOT, text: 'Hello! How can I help you today?', xmlOutput: '' }
    ]);
    const [input, setInput] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const bottomRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "40px";
            const maxHeight = 100;
            textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [input]);

    const scrollToBottom = () => {
        const el = bottomRef.current;
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    async function sendChatRequest(input: string): Promise<ChatApiResponse> {
        const response = await fetch('https://hjip65utx2.execute-api.us-east-1.amazonaws.com/Dev/process-request', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({
            type: 'question',
            question: input,
          }),
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const data: ChatApiResponse = await response.json();
        return data;
    }

    // async function sendFileQuestionRequest(
    //     input: string, 
    //     filename: string, 
    //     fileContent: string, 
    // ): Promise<ChatApiResponse> {
    //     const response = await fetch('https://nt61npvbxb.execute-api.us-east-2.amazonaws.com/Dev/process_test', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'text/plain',
    //       },
    //       body: JSON.stringify({
    //         type: 'file+question',
    //         filename: filename,
    //         file_content: fileContent,
    //         question: input,
    //         worker_name: 'stepfunction2',
    //       }),
    //     });
      
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
      
    //     const data: ChatApiResponse = await response.json();
    //     return data;
    // }

    async function sendFileQuestionRequest(
        input: string, 
        filename: string, 
        fileContent: string, 
    ): Promise<ChatApiResponse> {
        const response = await fetch('https://nt61npvbxb.execute-api.us-east-2.amazonaws.com/Dev/process_test', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({
            type: 'file+question',
            filename: filename,
            file_content: fileContent,
            question: input,
            worker_name: 'stepfunction2',
          }),
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const data = await response.json();
        const data2 = JSON.parse(data.body)

        const xml = parseXmlfromString(data2.output)

        const serializer = new XMLSerializer();
        const xmlText = serializer.serializeToString(xml!);
        localStorage.setItem('drawio-diagram', xmlText)
        

        return data;
    }

    function parseXmlfromString(xml: string): Document | null {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(xml, "application/xml");
      
          // Check for parsing errors
          const parserError = doc.getElementsByTagName("parsererror");
          if (parserError.length > 0) {
            console.error("XML parsing error:", parserError[0].textContent);
            return null;
          }
      
          return doc;
        } catch (err) {
          console.error("Failed to parse XML string:", err);
          return null;
        }
      }
      

//     const sendRequest = async (): Promise<ChatApiResponse> => {
//           const response = await fetch("https://nt61npvbxb.execute-api.us-east-2.amazonaws.com/Dev/process_test", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//               type: "file+question",
//               filename: "process.txt",
//               file_content: "V2hhdCBLaW5kcyBvZiBDaGFuZ2VzIENhbiBhIFJlY29uY2lsaWF0aW9uIEJpbGwgSW5jbHVkZT8KVGhlIENvbmdyZXNzaW9uYWwgQnVkZ2V0IEFjdCBwZXJtaXRzIHVzaW5nIHJlY29uY2lsaWF0aW9uIGZvciBsZWdpc2xhdGlvbiB0aGF0IGNoYW5nZXMgc3BlbmRpbmcsIHJldmVudWVzLCBhbmQvb3IgdGhlIGZlZGVyYWwgZGVidCBsaW1pdC4gT24gdGhlIHNwZW5kaW5nIHNpZGUsIHJlY29uY2lsaWF0aW9uIGNhbiBiZSB1c2VkIHRvIGFkZHJlc3MgbW9zdCDigJxtYW5kYXRvcnnigJ0gb3IgZW50aXRsZW1lbnQgc3BlbmRpbmcg4oCUIHRoYXQgaXMsIHByb2dyYW1zIHN1Y2ggYXMgTWVkaWNhcmUsIE1lZGljYWlkLCBmZWRlcmFsIGNpdmlsaWFuIGFuZCBtaWxpdGFyeSByZXRpcmVtZW50LCBTTkFQIChmb3JtZXJseSBrbm93biBhcyBmb29kIHN0YW1wcyksIGFuZCBmYXJtIHByb2dyYW1zIOKAlCB0aG91Z2ggdGhlIEJ1ZGdldCBBY3Qgc3BlY2lmaWNhbGx5IHByb2hpYml0cyB1c2luZyByZWNvbmNpbGlhdGlvbiB0byBjaGFuZ2UgdGhlIFNvY2lhbCBTZWN1cml0eSBwcm9ncmFtLiBNYW5kYXRvcnkgc3BlbmRpbmcgaXMgZGV0ZXJtaW5lZCBieSBydWxlcyBzZXQgaW4gb25nb2luZyBhdXRob3JpemluZyBsYXdzLCBzbyBjaGFuZ2luZyBzcGVuZGluZyB1c3VhbGx5IHJlcXVpcmVzIGFtZW5kaW5nIHRob3NlIGxhd3MuCgpSZWNvbmNpbGlhdGlvbiBoYXMgbm90IGJlZW4gdXNlZCB0byBlbmFjdCBvciByZXNjaW5kIOKAnGRpc2NyZXRpb25hcnnigJ0gZnVuZGluZywgd2hpY2ggaXMgY29udHJvbGxlZCB0aHJvdWdoIHRoZSBhbm51YWwgYXBwcm9wcmlhdGlvbnMgcHJvY2Vzcy4gV2hpbGUgbm90aGluZyBpbiB0aGUgQnVkZ2V0IEFjdCBvciBvdGhlciBydWxlcyBwcm9oaWJpdHMgcHJvdmlkaW5nIG5ldyBmdW5kaW5nIG9yIHJlc2NpbmRpbmcgZXhpc3RpbmcgZnVuZGluZyBmb3IgZGlzY3JldGlvbmFyeSBwcm9ncmFtcyB0aHJvdWdoIHJlY29uY2lsaWF0aW9uLCB0aGUgdmFyaW91cyByZXN0cmljdGlvbnMgb24gcmVjb25jaWxpYXRpb24gKGRpc2N1c3NlZCBtb3JlIGJlbG93KSBwcm9iYWJseSBtYWtlIHRoZSBwcm9jZXNzIGltcHJhY3RpY2FsIGFzIGEgbWVhbnMgb2YgZW5hY3RpbmcgYW5udWFsIGFwcHJvcHJpYXRpb25zLiBTb21lIHJlY29uY2lsaWF0aW9uIGJpbGxzIGhhdmUgaW5jbHVkZWQgYWRkaXRpb25hbCBmdW5kaW5nIGZvciBwcm9ncmFtcyB0aGF0IGFyZSB0cmFkaXRpb25hbGx5IGZ1bmRlZCB0aHJvdWdoIHRoZSBhbm51YWwgYXBwcm9wcmlhdGlvbnMgcHJvY2Vzcy4gQnV0IHRoYXQgZXh0cmEgZnVuZGluZyB3YXMgdHJlYXRlZCBhcyBtYW5kYXRvcnkgYmVjYXVzZSB0aGUgY29tbWl0dGVlcyB0aGF0IHJlY2VpdmVkIHRoZSByZWNvbmNpbGlhdGlvbiBpbnN0cnVjdGlvbnMgYW5kIHdyb3RlIHRob3NlIGZ1bmRpbmcgcHJvdmlzaW9ucyB3ZXJlIGF1dGhvcml6aW5nIGNvbW1pdHRlZXMsIG5vdCB0aGUgSG91c2UgYW5kIFNlbmF0ZSBhcHByb3ByaWF0aW9ucyBjb21taXR0ZWVzLgoKU2luY2UgdGhlIG1pZC0xOTgwcywgU2VuYXRlIHJ1bGVzIGhhdmUgcHJvaGliaXRlZCBpbmNsdWRpbmcgcHJvdmlzaW9ucyBpbiByZWNvbmNpbGlhdGlvbiBsZWdpc2xhdGlvbiB0aGF0IGRvIG5vdCBjaGFuZ2UgdGhlIGxldmVsIG9mIHNwZW5kaW5nIG9yIHJldmVudWVzIG9yIHRoZSBkZWJ0IGxpbWl0LiAoU2VlIHRoZSDigJxCeXJkIFJ1bGXigJ0gcXVlc3Rpb25zIGJlbG93IGZvciBtb3JlLikKCkhvdyBEb2VzIENvbmdyZXNzIFN0YXJ0IHRoZSBSZWNvbmNpbGlhdGlvbiBQcm9jZXNzPwpUbyBzdGFydCB0aGUgcmVjb25jaWxpYXRpb24gcHJvY2VzcywgdGhlIEhvdXNlIGFuZCBTZW5hdGUgbXVzdCBhZ3JlZSBvbiBhIGJ1ZGdldCByZXNvbHV0aW9uIHRoYXQgaW5jbHVkZXMg4oCccmVjb25jaWxpYXRpb24gZGlyZWN0aXZlc+KAnSBmb3Igc3BlY2lmaWVkIGNvbW1pdHRlZXMuIFVuZGVyIHRoZSBDb25ncmVzc2lvbmFsIEJ1ZGdldCBBY3QsIHRoZSBIb3VzZSBhbmQgU2VuYXRlIGFyZSBzdXBwb3NlZCB0byBhZG9wdCBhIGJ1ZGdldCByZXNvbHV0aW9uIGVhY2ggeWVhciB0byBlc3RhYmxpc2ggYW4gb3ZlcmFsbCBidWRnZXQgcGxhbiBhbmQgc2V0IGd1aWRlbGluZXMgZm9yIGFjdGlvbiBvbiBzcGVuZGluZyBhbmQgcmV2ZW51ZS4gVGhlIFNlbmF0ZSBtYXkgbm90IGZpbGlidXN0ZXIgY29uc2lkZXJhdGlvbiBvZiBidWRnZXQgcmVzb2x1dGlvbnMuIEJ1ZGdldCByZXNvbHV0aW9ucyBkb27igJl0IGdvIHRvIHRoZSBQcmVzaWRlbnQgZm9yIHNpZ25hdHVyZSBhbmQgZG9u4oCZdCBiZWNvbWUgbGF3OyByZWNvbmNpbGlhdGlvbiBpcyBhIHByb2NlZHVyZSBmb3IgZW5hY3Rpbmcgc29tZSBsZWdpc2xhdGlvbiBlbnZpc2lvbmVkIGluIGEgYnVkZ2V0IHJlc29sdXRpb24uCgpJbiBkZXZlbG9waW5nIGEgYnVkZ2V0IHJlc29sdXRpb24sIENvbmdyZXNzIG11c3QgZGVjaWRlIHdoZXRoZXIgdG8gaW5jbHVkZSByZWNvbmNpbGlhdGlvbiBkaXJlY3RpdmVzIGFuZCwgaWYgc28sIHdoZXRoZXIgdG8gdXNlIHRoZW0gdG8gaW1wbGVtZW50IGFsbCBvciBqdXN0IHNvbWUgb2YgdGhlIHByb3Bvc2VkIGNoYW5nZXMuCgpXaGF0IFJvbGUgRG8gQ29tbWl0dGVlcyBQbGF5PwpSZWNvbmNpbGlhdGlvbiBkaXJlY3RpdmVzIGluc3RydWN0IHNwZWNpZmllZCBIb3VzZSBhbmQgU2VuYXRlIGNvbW1pdHRlZXMgdG8gcHJlcGFyZSBhbmQgcmVwb3J0IGxlZ2lzbGF0aW9uIGJ5IGEgY2VydGFpbiBkYXRlIHRoYXQgZG9lcyBvbmUgb3IgbW9yZSBvZiB0aGUgZm9sbG93aW5nOgoKaW5jcmVhc2VzIG9yIGRlY3JlYXNlcyBzcGVuZGluZyAob3V0bGF5cykgYnkgc3BlY2lmaWVkIGFtb3VudHMgb3ZlciBhIHNwZWNpZmllZCB0aW1lOwppbmNyZWFzZXMgb3IgZGVjcmVhc2VzIHJldmVudWVzIGJ5IHNwZWNpZmllZCBhbW91bnRzIG92ZXIgYSBzcGVjaWZpZWQgdGltZTsgb3IKbW9kaWZpZXMgdGhlIHB1YmxpYyBkZWJ0IGxpbWl0LgpTb21ldGltZXMgdGhlIGluc3RydWN0aW9ucyBhcmUgZXhwcmVzc2VkIGFzIGZsb29ycyBvciBjZWlsaW5ncyByYXRoZXIgdGhhbiBzcGVjaWZpYyBhbW91bnRzLCBhbmQgc3BlbmRpbmcgYW5kIHJldmVudWUgdGFyZ2V0cyBoYXZlIG9mdGVuIGJlZW4gY29tYmluZWQgaW50byBhbiBpbnN0cnVjdGlvbiB0byBhY2hpZXZlIGEgcmVkdWN0aW9uIChvciBpbmNyZWFzZSkgaW4gdGhlIGRlZmljaXQuIEluIDIwMTcsIGZvciBleGFtcGxlLCB0byBlbmFjdCBsYXJnZSB0YXggY3V0cywgdGhlIGZpc2NhbCB5ZWFyIDIwMTggYnVkZ2V0IHJlc29sdXRpb24gaW5jbHVkZWQgaW5zdHJ1Y3Rpb25zIHRvIHRoZSBIb3VzZSBhbmQgU2VuYXRlIHRheC13cml0aW5nIGNvbW1pdHRlZXMgZGlyZWN0aW5nIHRoZW0gdG8gcmVwb3J0IGxlZ2lzbGF0aW9uIGluY3JlYXNpbmcgdGhlIGRlZmljaXQgYnkgbm90IG1vcmUgdGhhbiAkMS41IHRyaWxsaW9uIG92ZXIgdGVuIHllYXJzLiBJbiBjb250cmFzdCwgdGhlIGZpc2NhbCB5ZWFyIDIwMTcgYnVkZ2V0IHJlc29sdXRpb24gaW5jbHVkZWQgcmVjb25jaWxpYXRpb24gaW5zdHJ1Y3Rpb25zIChhaW1lZCBhdCBkaXNtYW50bGluZyB0aGUgQWZmb3JkYWJsZSBDYXJlIEFjdCkgZGlyZWN0aW5nIHJlbGV2YW50IEhvdXNlIGFuZCBTZW5hdGUgY29tbWl0dGVlcyB0byByZXBvcnQgbGVnaXNsYXRpb24gcmVkdWNpbmcgdGhlIGRlZmljaXQgYnkg4oCcbm90IGxlc3MgdGhhbuKAnSAkMSBiaWxsaW9uIG92ZXIgdGVuIHllYXJzIOKAlCBhIGdlbmVyYWwgdGFyZ2V0IHRoYXQgYWxsb3dlZCB0aGUgY29tbWl0dGVlcyB0byByZXBvcnQgbGVnaXNsYXRpb24gdGhhdCB3b3VsZCByZWNlaXZlIHJlY29uY2lsaWF0aW9uIHByb3RlY3Rpb24gd2l0aG91dCByZWFsbHkgc3BlY2lmeWluZyBhbiBpbnRlbmRlZCBidWRnZXRhcnkgZWZmZWN0LgoKUmVjb25jaWxpYXRpb24gZGlyZWN0aXZlcyBkbyBub3QgZGV0YWlsIHdoYXQgc3BlY2lmaWMgbGVnaXNsYXRpdmUgY2hhbmdlcyBhIGNvbW1pdHRlZSBzaG91bGQgYWRvcHQgdG8gbWVldCBpdHMgbnVtZXJpY2FsIHRhcmdldHMuCgpSZWNvbmNpbGlhdGlvbiBsZWdpc2xhdGlvbiBnZW5lcmFsbHkgZ29lcyB0aHJvdWdoIHRoZSBub3JtYWwgY29tbWl0dGVlIHByb2Nlc3MsIHdpdGggZWFjaCBjb21taXR0ZWUgdGhhdCByZWNlaXZlcyBhbiBpbnN0cnVjdGlvbiBjb25zaWRlcmluZyBhbmQgdm90aW5nIG9uIGxlZ2lzbGF0aW9uIHRvIGltcGxlbWVudCBpdHMgcGFydCBvZiB0aGUgcGFja2FnZS4gQ29tbWl0dGVlcyB1c3VhbGx5IG1lZXQgdGhlaXIgcmVjb25jaWxpYXRpb24gdGFyZ2V0cywgYnV0IGlmIGEgY29tbWl0dGVlIGZhbGxzIHNob3J0IG9mIGl0cyB0YXJnZXQgb3IgZmFpbHMgdG8gYWN0IGF0IGFsbCwgdGhlcmUgYXJlIHByb2NlZHVyZXMgZm9yIG9mZmVyaW5nIGFtZW5kbWVudHMgdG8gZmlsbCB0aGUgZ2FwIHdoZW4gdGhlIGJpbGwgZ29lcyB0byB0aGUgZnVsbCBIb3VzZSBvciBTZW5hdGUuCgpUaGUgU2VuYXRlIGhhcyBzb21ldGltZXMgc2tpcHBlZCBhIGZvcm1hbCBjb21taXR0ZWUgcHJvY2VzcywgaG93ZXZlciwgaW5zdGVhZCB3YWl0aW5nIGZvciB0aGUgSG91c2UgdG8gYWN0IGFuZCB0aGVuIHRha2luZyB0aGUgSG91c2UtcGFzc2VkIHJlY29uY2lsaWF0aW9uIGJpbGwgZGlyZWN0bHkgdG8gdGhlIFNlbmF0ZSBmbG9vci4gSXQgZGlkIHRoaXMgbW9zdCByZWNlbnRseSBpbiAyMDIxLCB3aXRoIHRoZSByZWNvbmNpbGlhdGlvbiBiaWxsIHRvIGVuYWN0IHRoZSBBbWVyaWNhbiBSZXNjdWUgUGxhbi4gSXQgaGFkIGFsc28gZG9uZSB0aGlzIGluIDIwMTcsIHdpdGggdGhlIGZhaWxlZCByZWNvbmNpbGlhdGlvbiBiaWxsIGludGVuZGVkIHRvIHJlcGVhbCBtdWNoIG9mIHRoZSBBZmZvcmRhYmxlIENhcmUgQWN0IGFuZCB3aXRoIHRoZSBlbmFjdGVkIHRheC1jdXR0aW5nIHJlY29uY2lsaWF0aW9uIGJpbGwuCgpXaGF0IFNwZWNpYWwgUm9sZSBEbyB0aGUgQnVkZ2V0IENvbW1pdHRlZXMgUGxheT8KSWYgbXVsdGlwbGUgY29tbWl0dGVlcyByZWNlaXZlIHJlY29uY2lsaWF0aW9uIGluc3RydWN0aW9ucywgdGhleSBzZW5kIHRoZWlyIHJlY29tbWVuZGF0aW9ucyB0byB0aGUgSG91c2Ugb3IgU2VuYXRlIEJ1ZGdldCBDb21taXR0ZWVzLCB3aGljaCBhc3NlbWJsZSB0aGVtIGludG8gYW4gb21uaWJ1cyBiaWxsIGZvciBmdWxsIEhvdXNlIG9yIFNlbmF0ZSBjb25zaWRlcmF0aW9uLlszXSBUaGUgQnVkZ2V0IENvbW1pdHRlZXMgY2Fu4oCZdCBtYWtlIGFueSBzdWJzdGFudGl2ZSBjaGFuZ2VzIGluIHRoZSBiaWxscy4gV2hldGhlciB0aGUgY29tbWl0dGVlIHJlY29tbWVuZGF0aW9ucyBhcmUgYXNzZW1ibGVkIGludG8gb25lIG9yIG11bHRpcGxlIGJpbGxzIGRlcGVuZHMgb24gdGhlIGluc3RydWN0aW9ucyBpbiB0aGUgYnVkZ2V0IHJlc29sdXRpb24gKHNlZSBuZXh0IHF1ZXN0aW9uKS4KCklmIG9ubHkgb25lIGNvbW1pdHRlZSBpbiBlYWNoIGNoYW1iZXIgcmVjZWl2ZXMgYSByZWNvbmNpbGlhdGlvbiBpbnN0cnVjdGlvbiwgaXRzIHJlY29tbWVuZGF0aW9uIGdvZXMgZGlyZWN0bHkgdG8gdGhlIGZ1bGwgSG91c2Ugb3IgU2VuYXRlLCBieXBhc3NpbmcgdGhlIEJ1ZGdldCBDb21taXR0ZWVzLgoKSG93IE1hbnkgUmVjb25jaWxpYXRpb24gQmlsbHMgTWF5IENvbmdyZXNzIENvbnNpZGVyIEVhY2ggWWVhcj8KVW5kZXIgU2VuYXRlIGludGVycHJldGF0aW9ucyBvZiB0aGUgQ29uZ3Jlc3Npb25hbCBCdWRnZXQgQWN0LCB0aGUgU2VuYXRlIGNhbiBjb25zaWRlciB0aGUgdGhyZWUgYmFzaWMgc3ViamVjdHMgb2YgcmVjb25jaWxpYXRpb24g4oCUIHNwZW5kaW5nLCByZXZlbnVlcywgYW5kIHRoZSBkZWJ0IGxpbWl0IOKAlCBpbiBhIHNpbmdsZSBiaWxsIG9yIG11bHRpcGxlIGJpbGxzLCBidXQgYSBidWRnZXQgcmVzb2x1dGlvbiBjYW4gZ2VuZXJhdGUgbm8gbW9yZSB0aGFuIG9uZSBiaWxsIGFkZHJlc3NpbmcgZWFjaCBvZiB0aG9zZSBzdWJqZWN0cy4gSW4gcHJhY3RpY2UsIGhvd2V2ZXIsIGEgdGF4IGJpbGwgaXMgbGlrZWx5IHRvIGFmZmVjdCBub3Qgb25seSByZXZlbnVlcyBidXQgYWxzbyBvdXRsYXlzIHRvIHNvbWUgZXh0ZW50IChmb3IgZXhhbXBsZSwgdmlhIHJlZnVuZGFibGUgdGF4IGNyZWRpdHMpLiBUaHVzLCBhcyBhIHByYWN0aWNhbCBtYXR0ZXIgYSBzaW5nbGUgYnVkZ2V0IHJlc29sdXRpb24gY2FuIHByb2JhYmx5IGdlbmVyYXRlIG9ubHkgdHdvIHJlY29uY2lsaWF0aW9uIGJpbGxzOiBhIHRheC1hbmQtc3BlbmRpbmcgYmlsbCBvciBhIHNwZW5kaW5nLW9ubHkgYmlsbCBhbmQsIGlmIGRlc2lyZWQsIGEgc2VwYXJhdGUgZGVidCBsaW1pdCBiaWxsLgoKSW4gMjAxNywgaG93ZXZlciwgQ29uZ3Jlc3Mgd2FzIGFibGUgdG8gdGFrZSB1cCBhbiBhZGRpdGlvbmFsIHJlY29uY2lsaWF0aW9uIGJpbGwgYnkgcGFzc2luZyB0d28gYnVkZ2V0IHJlc29sdXRpb25zOiBvbmUgZm9yIGZpc2NhbCB5ZWFyIDIwMTcgKHRoZSBmaXNjYWwgeWVhciBhbHJlYWR5IHVuZGVyd2F5LCBmb3Igd2hpY2ggYSBidWRnZXQgcmVzb2x1dGlvbiBoYWQgbm90IHlldCBiZWVuIGFkb3B0ZWQpIGFuZCB0aGVuIGFub3RoZXIgZm9yIGZpc2NhbCB5ZWFyIDIwMTggKHRoZSBmaXNjYWwgeWVhciB0aGF0IHdvdWxkIGJlZ2luIG9uIE9jdG9iZXIgMSwgMjAxNykuIENvbmdyZXNzIHVzZWQgdGhlIG92ZXJkdWUgZmlzY2FsIHllYXIgMjAxNyBidWRnZXQgcmVzb2x1dGlvbiB0byB0cmlnZ2VyIGEgcmVjb25jaWxpYXRpb24gYmlsbCBpbnRlbmRlZCB0byByZXBlYWwgdGhlIEFmZm9yZGFibGUgQ2FyZSBBY3QsIGFuZCB0aGVuIHVzZWQgdGhlIGZpc2NhbCB5ZWFyIDIwMTggcmVzb2x1dGlvbiB0byB0cmlnZ2VyIGEgdGF4LWN1dHRpbmcgcmVjb25jaWxpYXRpb24gYmlsbC4gQ29uZ3Jlc3MgdXNlZCB0aGUgc2FtZSBhcHByb2FjaCBpbiAyMDIxLCBwYXNzaW5nIGFuIG92ZXJkdWUgYnVkZ2V0IHJlc29sdXRpb24gZm9yIGZpc2NhbCB5ZWFyIDIwMjEgd2l0aCBhIHJlY29uY2lsaWF0aW9uIGRpcmVjdGl2ZSB0aGF0IGxlZCB0byBlbmFjdG1lbnQgb2YgdGhlIEFtZXJpY2FuIFJlc2N1ZSBQbGFuLCBhbmQgbGF0ZXIgcGFzc2luZyBhIGJ1ZGdldCByZXNvbHV0aW9uIGZvciBmaXNjYWwgeWVhciAyMDIyIHdpdGggYSByZWNvbmNpbGlhdGlvbiBkaXJlY3RpdmUgdGhhdCBsZWQgdG8gdGhlIEJ1aWxkIEJhY2sgQmV0dGVyIEFjdCwgd2hpY2ggdGhlIEhvdXNlIHBhc3NlZCBidXQgdGhlIFNlbmF0ZSBoYXMgbm90IGNvbnNpZGVyZWQuCgpVbmRlciB0aGUgQnVkZ2V0IEFjdCwgQ29uZ3Jlc3MgY2FuIHJldmlzZSBhIGJ1ZGdldCByZXNvbHV0aW9uIGFmdGVyIGFkb3B0aW5nIGl0LiBUaGUgU2VuYXRlIHBhcmxpYW1lbnRhcmlhbiBoYXMgcnVsZWQgdGhhdCBhIHJldmlzZWQgYnVkZ2V0IHJlc29sdXRpb24gY291bGQgYmUgdXNlZCB0byB0cmlnZ2VyIGFub3RoZXIgcmVjb25jaWxpYXRpb24gYmlsbCwgYnV0IHRoaXMgaGFzIG5ldmVyIGJlZW4gc3VjY2Vzc2Z1bGx5IGRvbmUuWzRdCgpDYW4gdGhlIEZ1bGwgSG91c2Ugb3IgU2VuYXRlIEFtZW5kIGEgUmVjb25jaWxpYXRpb24gQmlsbD8KV2hlbiB0aGUgZnVsbCBIb3VzZSBvciBTZW5hdGUgY29uc2lkZXJzIGEgcmVjb25jaWxpYXRpb24gYmlsbCwgYW1lbmRtZW50cyBtYXkgYmUgb2ZmZXJlZC4gQnV0IHRoZSBDb25ncmVzc2lvbmFsIEJ1ZGdldCBBY3QgZ2VuZXJhbGx5IHByb2hpYml0cyBjb25zaWRlcmF0aW9uIG9mIGFueSBhbWVuZG1lbnQgdGhhdCB3b3VsZCBjb3N0IG1vbmV5IOKAlCB0aGF0IGlzLCByYWlzZSBzcGVuZGluZyBvciBjdXQgdGF4ZXMgd2l0aG91dCBmdWxseSBvZmZzZXR0aW5nIHRoZSBjb3N0Lls1XSBBbiBleGNlcHRpb24gaXMgdGhhdCwgaW4gdGhlIFNlbmF0ZSwgYW4gYW1lbmRtZW50IHRvIHNpbXBseSBzdHJpa2UgYSBwcm92aXNpb24gaXMgcGVybWlzc2libGUgZXZlbiBpZiBkb2luZyBzbyB3b3VsZCBjb3N0IG1vbmV5LgoKQXMgd2l0aCBvdGhlciBtYWpvciBsZWdpc2xhdGlvbiwgdGhlIEhvdXNlIHR5cGljYWxseSBhZG9wdHMgYSBzcGVjaWFsIOKAnHJ1bGXigJ0gZXN0YWJsaXNoaW5nIHNwZWNpZmljIHByb2NlZHVyZXMgZm9yIGNvbnNpZGVyaW5nIGEgcmVjb25jaWxpYXRpb24gYmlsbC4gVGhhdCBydWxlIHdpbGwgdHlwaWNhbGx5IGFsbG93IG9ubHkgY2VydGFpbiBzcGVjaWZpZWQgYW1lbmRtZW50cyB0byBiZSBvZmZlcmVkLiBJbiB0aGUgU2VuYXRlLCBhbWVuZG1lbnRzIG11c3QgYWxzbyBjb21wbHkgd2l0aCBvdGhlciBydWxlcyB0aGF0IGd1aWRlIGNvbnNpZGVyYXRpb24gb2YgcmVjb25jaWxpYXRpb24gKHNlZSBCeXJkIFJ1bGUgcXVlc3Rpb25zIGJlbG93KSwgYW5kIHdpdGggYnVkZ2V0IOKAnHBvaW50cyBvZiBvcmRlcuKAnSAob3IgcGFybGlhbWVudGFyeSBvYmplY3Rpb25zKSBlc3RhYmxpc2hlZCB1bmRlciBlaXRoZXIgdGhlIENvbmdyZXNzaW9uYWwgQnVkZ2V0IEFjdCBvciBhIGJ1ZGdldCByZXNvbHV0aW9uLgoKV2hhdCBIYXBwZW5zIEFmdGVyIEVhY2ggQ2hhbWJlciBBZG9wdHMgYSBSZWNvbmNpbGlhdGlvbiBCaWxsPwpJZiB0aGUgSG91c2UgYW5kIFNlbmF0ZSBhZG9wdCBkaWZmZXJlbnQgdmVyc2lvbnMgb2YgYSByZWNvbmNpbGlhdGlvbiBiaWxsLCB0aGV5IG11c3QgdGhlbiB3b3JrIG91dCB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiB0aGUgdHdvLiBUaGlzIGlzIHVzdWFsbHkgYWNjb21wbGlzaGVkIHRocm91Z2ggYSBIb3VzZS1TZW5hdGUgY29uZmVyZW5jZSBjb21taXR0ZWUgYnV0IGNvdWxkIGFsc28gYmUgZG9uZSB0aHJvdWdoIGFuIGV4Y2hhbmdlIG9mIGFtZW5kbWVudHMgYmV0d2VlbiB0aGUgdHdvIGhvdXNlcy4gSXTigJlzIGFsc28gcG9zc2libGUgdGhhdCB0aGUgU2VuYXRlIGNvdWxkIHBhc3MgYSB2ZXJzaW9uIHRoYXQgaXQgcHJlLW5lZ290aWF0ZWQgd2l0aCB0aGUgSG91c2UuIEJvdGggYm9kaWVzIHRoZW4gdGFrZSBhbiB1cC1vci1kb3duIHZvdGUgb24gdGhlIGZpbmFsLCBjb21wcm9taXNlIHZlcnNpb24uIElmIHRoZXkgYXBwcm92ZSBpdCwgdGhlIGJpbGwgZ29lcyB0byB0aGUgUHJlc2lkZW50IGZvciBzaWduYXR1cmUuCgpJZiB0aGUgUHJlc2lkZW50IHZldG9lcyB0aGUgcmVjb25jaWxpYXRpb24gbWVhc3VyZSBhbmQgQ29uZ3Jlc3MgY2Fu4oCZdCBvdmVycmlkZSB0aGUgdmV0bywgdGhhdCByb3VuZCBvZiB0aGUgcmVjb25jaWxpYXRpb24gcHJvY2VzcyBpcyBvdmVyLiBUbyByZXBsYWNlIHRoZSB2ZXRvZWQgYmlsbCB3aXRoIGEgbmV3IHJlY29uY2lsaWF0aW9uIGJpbGwsIHRoZSBIb3VzZSBhbmQgU2VuYXRlIHdvdWxkIGZpcnN0IG5lZWQgdG8gYWdyZWUgb24gYSBuZXcgYnVkZ2V0IHJlc29sdXRpb24gb3IgcmV2aXNlIHRoZSBleGlzdGluZyByZXNvbHV0aW9uLgoKV2hhdCBQcm9jZWR1cmFsIEFkdmFudGFnZXMgRG9lcyBSZWNvbmNpbGlhdGlvbiBIYXZlIGluIHRoZSBTZW5hdGU/ClRoZSBTZW5hdGUgY2FuIGNvbnNpZGVyIGFuZCBwYXNzIHJlY29uY2lsaWF0aW9uIGJpbGxzIHJlbGF0aXZlbHkgcXVpY2tseSBhbmQgd2l0aCBvbmx5IGEgc2ltcGxlIG1ham9yaXR5LCByYXRoZXIgdGhhbiB0aGUgdGhyZWUtZmlmdGhzIG1ham9yaXR5IG9mdGVuIG5lZWRlZCBmb3IgY29udHJvdmVyc2lhbCBsZWdpc2xhdGlvbi5bNl0gVGhhdOKAmXMgYmVjYXVzZSByZWNvbmNpbGlhdGlvbiBsZWdpc2xhdGlvbiBpc27igJl0IHN1YmplY3QgdG8gZmlsaWJ1c3Rlci4gVW5kZXIgZ2VuZXJhbCBTZW5hdGUgcnVsZXMsIGxlZ2lzbGF0aW9uIGNhbiBiZSBzdGFsbGVkIGJ5IHZpcnR1YWxseSB1bmxpbWl0ZWQgZGViYXRlIGFuZCB0aGUgb2ZmZXJpbmcgb2YgbnVtZXJvdXMgYW1lbmRtZW50cywgd2l0aCBhIHRocmVlLWZpZnRocyBtYWpvcml0eSB2b3RlIHJlcXVpcmVkIHRvIGludm9rZSDigJxjbG90dXJlLOKAnSB0aGVyZWJ5IGxpbWl0aW5nIGRlYmF0ZSBhbmQgYmxvY2tpbmcgbm9uLWdlcm1hbmUgYW1lbmRtZW50cy4gRm9yIGEgcmVjb25jaWxpYXRpb24gYmlsbCwgaG93ZXZlciwgdGhlIENvbmdyZXNzaW9uYWwgQnVkZ2V0IEFjdCBsaW1pdHMgU2VuYXRlIGRlYmF0ZSBvbiB0aGUgYmlsbCB0byAyMCBob3VycyBhbmQgbGltaXRzIGRlYmF0ZSBvbiB0aGUgc3Vic2VxdWVudCBjb21wcm9taXNlIGJldHdlZW4gdGhlIHR3byBob3VzZXMgdG8gdGVuIGhvdXJzLgoKV2hpbGUgdGhlIHNwZWNpYWwgcHJvY2VkdXJlcyBsaW1pdCB0aGUgdGltZSBmb3IgZGViYXRlLCB0aGV5IGRvIG5vdCBsaW1pdCB0aGUgbnVtYmVyIG9mIGFtZW5kbWVudHMgdGhhdCBjYW4gYmUgb2ZmZXJlZCBkdXJpbmcgdGhlIFNlbmF0ZeKAmXMgaW5pdGlhbCBjb25zaWRlcmF0aW9uIG9mIHRoZSBiaWxsLiBBcyBhIHJlc3VsdCwgb25jZSB0aGUgMjAtaG91ciBsaW1pdCBoYXMgZXhwaXJlZCwgcmVtYWluaW5nIGFtZW5kbWVudHMgYXJlIGNvbnNpZGVyZWQgd2l0aCBsaXR0bGUgb3Igbm8gZGViYXRlIOKAlCBhIHByb2Nlc3Mga25vd24gYXMgYSDigJx2b3RlLWEtcmFtYS7igJ0KCkluIHRoZSBTZW5hdGUsIGFueSBhbWVuZG1lbnRzIG9mZmVyZWQgdG8gYSByZWNvbmNpbGlhdGlvbiBiaWxsIG11c3QgYmUgZ2VybWFuZSB0byB0aGUgYmlsbCwgd2hpY2ggaXMgbm90IHVzdWFsbHkgYSByZXF1aXJlbWVudCBmb3IgYW1lbmRtZW50cyBpbiB0aGUgU2VuYXRlLls3XSBUaGlzIHByZXZlbnRzIHRoZSBwcm9jZXNzIGZyb20gZ2V0dGluZyBib2dnZWQgZG93biBieSBkaXNwdXRlcyBvdmVyIHRhbmdlbnRpYWxseSByZWxhdGVkIG9yIHVucmVsYXRlZCBhbWVuZG1lbnRzLCBhcyBvZnRlbiBoYXBwZW5zIHRvIG90aGVyIGxlZ2lzbGF0aW9uIHVuZGVyIHJlZ3VsYXIgU2VuYXRlIHByb2NlZHVyZXMuCgpXaGF0IFByb2NlZHVyYWwgQWR2YW50YWdlcyBEb2VzIFJlY29uY2lsaWF0aW9uIEhhdmUgaW4gdGhlIEhvdXNlPwpEaXNjdXNzaW9uIG9mIHJlY29uY2lsaWF0aW9u4oCZcyBwcm9jZWR1cmFsIGFkdmFudGFnZXMgdGVuZHMgdG8gZm9jdXMgb24gdGhlIFNlbmF0ZSBiZWNhdXNlIHRoZSBIb3VzZSBoYXMgbWVjaGFuaXNtcyBmb3IgbGltaXRpbmcgZGViYXRlIGFuZCBhbWVuZG1lbnRzIGF2YWlsYWJsZSBmb3IgYW55IGxlZ2lzbGF0aW9uLiBGb3IgbWFqb3IgYmlsbHMsIGluY2x1ZGluZyByZWNvbmNpbGlhdGlvbiwgdGhlIHVzdWFsIG1lY2hhbmlzbSBpcyBhIHNwZWNpYWwg4oCccnVsZeKAnSBmb3IgZmxvb3IgY29uc2lkZXJhdGlvbiDigJQgYSByZXNvbHV0aW9uIHJlcG9ydGVkIGJ5IHRoZSBSdWxlcyBDb21taXR0ZWUgYW5kIGFkb3B0ZWQgYnkgdGhlIEhvdXNlIGJ5IG1ham9yaXR5IHZvdGUg4oCUIHRoYXQgc3BlY2lmaWVzIGJvdGggdGhlIG1heGltdW0gdGltZSBmb3IgZGViYXRlIGFuZCB3aGF0IGFtZW5kbWVudHMgd2lsbCBiZSBhbGxvd2VkLgoKQ2FuIFJlY29uY2lsaWF0aW9uIEJlIFVzZWQgdG8gSW5jcmVhc2UgRGVmaWNpdHM/CldoaWxlIHJlY29uY2lsaWF0aW9uIGhhcyB0cmFkaXRpb25hbGx5IGJlZW4gdGhvdWdodCBvZiBhcyBtb3N0bHkgYSBtZWFucyB0byBlbmFjdCBkZWZpY2l0LXJlZHVjdGlvbiBsZWdpc2xhdGlvbiwgQ29uZ3Jlc3MgaGFzIHVzZWQgaXQgb2NjYXNpb25hbGx5IHRvIGV4cGVkaXRlIHBhc3NhZ2Ugb2YgbGVnaXNsYXRpb24gdGhhdCBpbmNyZWFzZXMgZGVmaWNpdHMuIFRoZSBtb3N0IG5vdGFibGUgZXhhbXBsZXMgd2VyZSB0aGUgMjAwMSBhbmQgMjAwMyByZWNvbmNpbGlhdGlvbiBiaWxscywgd2hpY2ggZW5hY3RlZCB0YXggY3V0cyBiYXNlZCBvbiBwcm9wb3NhbHMgYnkgUHJlc2lkZW50IEdlb3JnZSBXLiBCdXNoOyB0aGUgcmVjb25jaWxpYXRpb24gYmlsbCB0aGF0IGVuYWN0ZWQgdGF4IGN1dHMgaW4gMjAxNzsgYW5kIHRoZSBBbWVyaWNhbiBSZXNjdWUgUGxhbiBpbiAyMDIxLls4XQoKSW4gMjAwNywgd2hlbiBEZW1vY3JhdHMgdG9vayBjb250cm9sIG9mIHRoZSBIb3VzZSBhbmQgU2VuYXRlLCBib3RoIGNoYW1iZXJzIGFkb3B0ZWQgcnVsZXMgZGVzaWduZWQgdG8gcHJvaGliaXQgdXNlIG9mIHJlY29uY2lsaWF0aW9uIGZvciBtZWFzdXJlcyB0aGF0IGluY3JlYXNlIGRlZmljaXRzLiBXaGVuIFJlcHVibGljYW5zIHRvb2sgdGhlIEhvdXNlIGluIDIwMTEsIHRoZXkgcmVwbGFjZWQgdGhlIEhvdXNlIHJ1bGUgd2l0aCBvbmUgdGhhdCBwbGFjZWQgbm8gcmVzdHJpY3Rpb25zIG9uIHJldmVudWUgcHJvdmlzaW9ucyB0aGF0IGluY3JlYXNlIGRlZmljaXRzIGJ1dCBwcm9oaWJpdGVkIHJlY29uY2lsaWF0aW9uIGluc3RydWN0aW9ucyB0aGF0IHdvdWxkIHByb2R1Y2UgYSBuZXQgaW5jcmVhc2UgaW4gbWFuZGF0b3J5IHNwZW5kaW5nLCByZWdhcmRsZXNzIG9mIHRoZSByZWNvbmNpbGlhdGlvbiBiaWxs4oCZcyBvdmVyYWxsIGltcGFjdCBvbiBkZWZpY2l0cy4gVGhhdCBIb3VzZSBydWxlIHdhcyByZXBlYWxlZCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBuZXcgQ29uZ3Jlc3MgaW4gMjAyMS4KClRoZSBTZW5hdGUgcnVsZSBhZ2FpbnN0IGRlZmljaXQtaW5jcmVhc2luZyByZWNvbmNpbGlhdGlvbiBiaWxscyB3YXMgcmVwZWFsZWQgaW4gMjAxNSwgYXMgcGFydCBvZiB0aGUgYnVkZ2V0IHJlc29sdXRpb24gZm9yIGZpc2NhbCB5ZWFyIDIwMTYuClRoZSBCdWRnZXQgIlJlY29uY2lsaWF0aW9uIiBQcm9jZXNzIApUaGUgYnVkZ2V0IOKAnHJlY29uY2lsaWF0aW9u4oCdIHByb2Nlc3MgaXMgYW4gb3B0aW9uYWwgc3BlY2lhbCBwcm9jZWR1cmUgb3V0bGluZWQgaW4gdGhlIENvbmdyZXNzaW9uYWwgQnVkZ2V0IEFjdCB0byBleHBlZGl0ZSB0aGUgY29uc2lkZXJhdGlvbiBvZiBzcGVuZGluZyBhbmQgdGF4IGxlZ2lzbGF0aW9uLiBUaGlzIHByb2NlZHVyZSB3YXMgb3JpZ2luYWxseSBlbnZpc2lvbmVkIGFzIGEgZGVmaWNpdC1yZWR1Y3Rpb24gdG9vbCwgdG8gZm9yY2UgY29tbWl0dGVlcyB0byBwcm9kdWNlIHNwZW5kaW5nIGN1dHMgb3IgdGF4IGluY3JlYXNlcyBjYWxsZWQgZm9yIGluIHRoZSBidWRnZXQgcmVzb2x1dGlvbi4gU2l4dGVlbiBzdWNoIGRlZmljaXQtcmVkdWNpbmcgcmVjb25jaWxpYXRpb24gYmlsbHMgaGF2ZSBiZWVuIGVuYWN0ZWQsIGluY2x1ZGluZyB0aGUgSW5mbGF0aW9uIFJlZHVjdGlvbiBBY3Qgb2YgMjAyMi4gSG93ZXZlciwgaXQgaGFzIGJlZW4gdXNlZCB0byBpbmNyZWFzZSB0aGUgZGVmaWNpdCBvbiBzZXZlcmFsIG9jY2FzaW9ucywgbm90YWJseSB0byBlbmFjdCB0YXggY3V0cyB0aHJlZSB0aW1lcyBkdXJpbmcgdGhlIEdlb3JnZSBXLiBCdXNoIEFkbWluaXN0cmF0aW9uIGFuZCBhZ2FpbiB1bmRlciB0aGUgVHJ1bXAgQWRtaW5pc3RyYXRpb24gaW4gMjAxNywgYW5kIHRvIGVuYWN0IGEgQ09WSUQtMTkgcmVsaWVmIGJpbGwgdW5kZXIgdGhlIEJpZGVuIEFkbWluaXN0cmF0aW9uIGluIDIwMjEuIEFsdGhvdWdoIHRoZSByZWNvbmNpbGlhdGlvbiBwcm9jZXNzIGlzIG9wdGlvbmFsLCBpdHMgcHJvY2VkdXJhbCBhZHZhbnRhZ2VzIChzZWUgYmVsb3cpIGFyZSBzdWZmaWNpZW50IHN1Y2ggdGhhdCBDb25ncmVzcyBoYXMgaW5jcmVhc2luZ2x5IHVzZWQgaXQgdG8gZW5hY3QgbWFqb3Igc3BlbmRpbmcgYW5kIHRheCBjaGFuZ2VzLiBJbiByZWNlbnQgZGVjYWRlcywgdGhlIG1vc3QgbGlrZWx5IHJlYXNvbiBmb3IgQ29uZ3Jlc3MgdG8gcHJvY2VlZCB3aXRoIGEgYnVkZ2V0IHJlc29sdXRpb24gYXQgYWxsIGlzIHRvIHRyaWdnZXIgdGhlIHJlY29uY2lsaWF0aW9uIHByb2Nlc3M7IGlmIGEgcmVjb25jaWxpYXRpb24gYmlsbCBpcyBub3QgZW52aXNpb25lZCwgQ29uZ3Jlc3MgaXMgbGlrZWx5IHRvIGZvcmdvIGEgYnVkZ2V0IHJlc29sdXRpb24gZW50aXJlbHkuCkhvdyBkb2VzIENvbmdyZXNzIHN0YXJ0IHRoZSByZWNvbmNpbGlhdGlvbiBwcm9jZXNzPwpUbyBzdGFydCBhIHJlY29uY2lsaWF0aW9uIHByb2Nlc3MsIHRoZSBIb3VzZSBhbmQgU2VuYXRlIG11c3QgYWRvcHQgYSBidWRnZXQgcmVzb2x1dGlvbiB0aGF0IGluY2x1ZGVzIGEg4oCccmVjb25jaWxpYXRpb24gZGlyZWN0aXZl4oCdIGluc3RydWN0aW5nIG9uZSBvciBtb3JlIGNvbW1pdHRlZXMgdG8gcHJvZHVjZSBsZWdpc2xhdGlvbiBieSBhIHNwZWNpZmljIGRhdGUgdGhhdCBtZWV0cyBjZXJ0YWluIHNwZW5kaW5nIG9yIHRheCB0YXJnZXRzLCB0aG91Z2ggdGhlIHRhcmdldCBtYXkgaW5zdGVhZCBiZSBhIGRpcmVjdGl2ZSB0byDigJxjaGFuZ2UgdGhlIChwcm9qZWN0ZWQpIGRlZmljaXTigJ0gYnkgYSBzcGVjaWZpZWQgYW1vdW50LiBJZiBhIGNvbW1pdHRlZSBmYWlscyB0byBwcm9kdWNlIHRoaXMgbGVnaXNsYXRpb24sIHRoZSBCdWRnZXQgQ29tbWl0dGVlIGNoYWlyIGdlbmVyYWxseSBoYXMgdGhlIHJpZ2h0IHRvIG9mZmVyIGZsb29yIGFtZW5kbWVudHMgdG8gbWVldCB0aGUgcmVjb25jaWxpYXRpb24gdGFyZ2V0IGZvciB0aGUgY29tbWl0dGVlOyB0aGlzIHRocmVhdCB1c3VhbGx5IHJlc3VsdHMgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBkaXJlY3RpdmUuCldoYXQgaXMgYSByZWNvbmNpbGlhdGlvbiBiaWxsIGFuZCB3aGF0IGFyZSBpdHMgcHJvY2VkdXJhbCBhZHZhbnRhZ2VzPwpPbmNlIHRoZSBjb21taXR0ZWVzIHByb2R1Y2UgbGVnaXNsYXRpb24gY29uc2lzdGVudCB3aXRoIHRoZSByZWNvbmNpbGlhdGlvbiBkaXJlY3RpdmUsIHRoZSBCdWRnZXQgQ29tbWl0dGVlIHBhY2thZ2VzIGFsbCBvZiB0aGVzZSBtZWFzdXJlcyB0b2dldGhlciBpbnRvIGEgc2luZ2xlIOKAnHJlY29uY2lsaWF0aW9uIGJpbGzigJ0gdGhhdCBnb2VzIHRvIHRoZSBmbG9vci4gVW5kZXIgdGhlIHJ1bGVzIGd1aWRpbmcgcmVjb25jaWxpYXRpb24sIHRoZSBiaWxsIGlzIG5vdCBzdWJqZWN0IHRvIGEgZmlsaWJ1c3RlciBhbmQgZGViYXRlIGlzIGxpbWl0ZWQgdG8gMjAgaG91cnM7IGFtZW5kbWVudHMgYXJlIGFsc28gbW9yZSBjaXJjdW1zY3JpYmVkLiBBcyBhIHJlc3VsdCwgdGhlIFNlbmF0ZSBjYW4gY29uc2lkZXIgYW5kIHBhc3MgYSByZWNvbmNpbGlhdGlvbiBiaWxsIGZhaXJseSBxdWlja2x5IHJlbGF0aXZlIHRvIG90aGVyIGNvbnRyb3ZlcnNpYWwgbGVnaXNsYXRpb24sIHdoaWNoIGlzIHN1YmplY3QgdG8gYSBmaWxpYnVzdGVyIGFuZCBzbyByZXF1aXJlcyA2MCB2b3RlcyB0byBwcm9jZWVkLgpXaGF0IHR5cGUgb2Ygc3BlbmRpbmcgaXMgc3ViamVjdCB0byByZWNvbmNpbGlhdGlvbj8KSGlzdG9yaWNhbGx5LCBzcGVuZGluZyBjaGFuZ2VzIGluIHJlY29uY2lsaWF0aW9uIGJpbGxzIGhhdmUgYmVlbiBsaW1pdGVkIHRvIG1hbmRhdG9yeSBwcm9ncmFtcy4gQnV0IG9uIHNvbWUgb2NjYXNpb25zLCBlc3BlY2lhbGx5IGluIDIwMjEsIGFkZGl0aW9uYWwgZnVuZGluZyBmb3IgZGlzY3JldGlvbmFyeSBwcm9ncmFtcyBoYXMgYmVlbiBkaXJlY3RseSBwcm92aWRlZCBieSB0aGUgY29tbWl0dGVlcyB3aXRoIGF1dGhvcml6aW5nIGp1cmlzZGljdGlvbiBvdmVyIHRob3NlIHByb2dyYW1zLCBieXBhc3NpbmcgdGhlIEFwcHJvcHJpYXRpb25zIENvbW1pdHRlZXMuIENvbnNlcXVlbnRseSwgdGhlIEhvdXNlIGFuZCBTZW5hdGUgY29tbWl0dGVlcyB0aGF0IGhhdmUgcmVjZWl2ZWQgcmVjb25jaWxpYXRpb24gaW5zdHJ1Y3Rpb25zIGhhdmUgYWx3YXlzIGJlZW4gbGltaXRlZCB0bwphKQl0aGUgdGF4IGNvbW1pdHRlZXMgKHRoZSBIb3VzZSBXYXlzIGFuZCBNZWFucyBDb21taXR0ZWUgYW5kIHRoZSBTZW5hdGUgRmluYW5jZSBDb21taXR0ZWUpCmIpCWF1dGhvcml6aW5nIGNvbW1pdHRlZXMsIHdpdGgganVyaXNkaWN0aW9uIG92ZXIgbWFuZGF0b3J5IHNwZW5kaW5nIHByb2dyYW1zCmMpCWF1dGhvcml6aW5nIGNvbW1pdHRlZXMgcmF0aGVyIHRoYW4gdGhlIEFwcHJvcHJpYXRpb25zIENvbW1pdHRlZXMsIGV2ZW4gd2hlbiBkaXJlY3QgZnVuZGluZyBjaGFuZ2VzIHRvIG90aGVyd2lzZSBkaXNjcmV0aW9uYXJ5IHByb2dyYW1zIGhhdmUgYmVlbiBlbnZpc2lvbmVkLgoKV2hhdCBjb25zdHJhaW50cyBkb2VzIHRoZSDigJxCeXJkIFJ1bGXigJ0gaW1wb3NlIG9uIHJlY29uY2lsaWF0aW9uPwpXaGlsZSByZWNvbmNpbGlhdGlvbiBlbmFibGVzIENvbmdyZXNzIHRvIG1ha2UgY2hhbmdlcyB0byBzcGVuZGluZyBhbmQgdGF4IGxlZ2lzbGF0aW9uIGJ5IG1ham9yaXR5IHZvdGUsIGl0IGZhY2VzIG9uZSBtYWpvciBjb25zdHJhaW50OiB0aGUg4oCcQnlyZCBSdWxlLOKAnSBuYW1lZCBhZnRlciB0aGUgbGF0ZSBTZW5hdG9yIFJvYmVydCBCeXJkIG9mIFdlc3QgVmlyZ2luaWEuIFRoaXMgU2VuYXRlIHJ1bGUgcHJvdmlkZXMgYSBwb2ludCBvZiBvcmRlciBhZ2FpbnN0IGFueSBwcm92aXNpb24gb2YgKG9yIGFtZW5kbWVudCB0bykgYSByZWNvbmNpbGlhdGlvbiBiaWxsIHRoYXQgaXMgZGVlbWVkIOKAnGV4dHJhbmVvdXPigJ0gdG8gdGhlIHB1cnBvc2Ugb2YgYW1lbmRpbmcgc3BlbmRpbmcgb3IgdGF4IGxhdy4gSWYgYSBwb2ludCBvZiBvcmRlciBpcyByYWlzZWQgdW5kZXIgdGhlIEJ5cmQgUnVsZSwgdGhlIG9mZmVuZGluZyBwcm92aXNpb24gaXMgYXV0b21hdGljYWxseSBzdHJpcHBlZCBmcm9tIHRoZSBiaWxsIHVubGVzcyBhdCBsZWFzdCA2MCBzZW5hdG9ycyB2b3RlIHRvIHdhaXZlIHRoZSBydWxlLiBUaGlzIG1ha2VzIGl0IGRpZmZpY3VsdCwgZm9yIGV4YW1wbGUsIHRvIGluY2x1ZGUgYW55IHBvbGljeSBjaGFuZ2VzIGluIGEgcmVjb25jaWxpYXRpb24gYmlsbCB1bmxlc3MgdGhleSBoYXZlIGRpcmVjdCBmaXNjYWwgaW1wbGljYXRpb25zIGFuZCB0aG9zZSBmaXNjYWwgZWZmZWN0cyBtdXN0IGJlIG1vcmUgdGhhbiDigJxtZXJlbHkgaW5jaWRlbnRhbOKAnSB0byB0aGUgbm9uLWJ1ZGdldGFyeSBhc3BlY3RzIG9mIHRoZSBwcm92aXNpb24uIFVuZGVyIHRoaXMgcnVsZSwgY2hhbmdlcyBpbiB0aGUgYXV0aG9yaXphdGlvbiBvZiBkaXNjcmV0aW9uYXJ5IGFwcHJvcHJpYXRpb25zIHdoaWNoIHdpbGwgYmUgZnVuZGVkIGluIGxhdGVyIGFwcHJvcHJpYXRpb25zIGJpbGxzIHJhdGhlciB0aGFuIGRpcmVjdGx5IGZ1bmRlZCBpbiB0aGUgcmVjb25jaWxpYXRpb24gYmlsbCBhcmUgbm90IGFsbG93ZWQuIE5vciwgZm9yIGV4YW1wbGUsIGFyZSBjaGFuZ2VzIHRvIGNpdmlsIHJpZ2h0cyBvciBlbXBsb3ltZW50IGxhdyBvciBldmVuIHRoZSBidWRnZXQgcHJvY2Vzcy4gQ2hhbmdlcyB0byBTb2NpYWwgU2VjdXJpdHkgYWxzbyBhcmUgbm90IHBlcm1pdHRlZCB1bmRlciB0aGUgQnlyZCBSdWxlLCBldmVuIGlmIHRoZXkgYXJlIGJ1ZGdldGFyeS4gSW4gYWRkaXRpb24sIHRoZSBCeXJkIFJ1bGUgYmFycyBhbnkgc3BlbmRpbmcgaW5jcmVhc2VzIG9yIHRheCBjdXRzIHRoYXQgY29zdCBtb25leSBiZXlvbmQgdGhlIGZpdmUgKG9yIG1vcmUgdXN1YWxseSB0ZW4pIHllYXJzIGNvdmVyZWQgYnkgdGhlIHJlY29uY2lsaWF0aW9uIGRpcmVjdGl2ZSwgdW5sZXNzIG90aGVyIHByb3Zpc2lvbnMgaW4gdGhlIGJpbGwgZnVsbHkgb2Zmc2V0IHRoZXNlICJvdXRzaWRlLXRoZS13aW5kb3ciIGNvc3RzLiBGb3IgYSBtb3JlIHRob3JvdWdoIGRpc2N1c3Npb24gb2YgdGhlIEJ5cmQgUnVsZSwgaW5jbHVkaW5nIGFuIGV4cGxhbmF0aW9uIG9mIHdoeSDigJxtZXJlbHkgaW5jaWRlbnRhbOKAnSBidWRnZXRhcnkgZWZmZWN0cyBkb2VzIG5vdCBtZWFuIOKAnHNtYWxs4oCdIGJ1ZGdldGFyeSBlZmZlY3RzLgoKV2hhdCBQcm92aXNpb25zIEFyZSDigJxFeHRyYW5lb3Vz4oCdIFVuZGVyIHRoZSBCeXJkIFJ1bGU/ClRoZSBCeXJkIFJ1bGUgZ2VuZXJhbGx5IHRyZWF0cyBhcyBleHRyYW5lb3VzIGFueSBwcm92aXNpb24gb2YgYSByZWNvbmNpbGlhdGlvbiBtZWFzdXJlIHRoYXQgZG9lc27igJl0IGNoYW5nZSB0aGUgbGV2ZWwgb2Ygc3BlbmRpbmcgb3IgcmV2ZW51ZXMsIG9yIHdoZXJlIHRoZSBjaGFuZ2UgaW4gc3BlbmRpbmcgb3IgcmV2ZW51ZXMgaXMg4oCcbWVyZWx5IGluY2lkZW50YWzigJ0gdG8gdGhlIHByb3Zpc2lvbuKAmXMgbm9uLWJ1ZGdldGFyeSBlZmZlY3RzLiAoVGhlIEJ5cmQgUnVsZSBhbGxvd3MgZm9yIGluY2x1c2lvbiBvZiBwcm92aXNpb25zIHRoYXQgaGF2ZSBubyBidWRnZXRhcnkgZWZmZWN0IGFzIGxvbmcgYXMgdGhleSBhcmUgZGV0ZXJtaW5lZCB0byBiZSDigJx0ZXJtcyBhbmQgY29uZGl0aW9uc+KAnSBvZiBvdGhlciBwcm92aXNpb25zIHdpdGhpbiB0aGUgYmlsbCB0aGF0IGRvIGhhdmUgYSBidWRnZXRhcnkgZWZmZWN0LikgVGhlIHJ1bGUgYWxzbyBkZWNsYXJlcyBleHRyYW5lb3VzIGFueSBwcm92aXNpb24gdGhhdDoKCmluY3JlYXNlcyBzcGVuZGluZyBvciBkZWNyZWFzZXMgcmV2ZW51ZXMgaWYgdGhlIHByb3Zpc2lvbiBpbiBxdWVzdGlvbiByZXN1bHRzIGluIHRoZSBjb21taXR0ZWXigJlzIHBvcnRpb24gb2YgdGhlIGJpbGwgY29zdGluZyB0b28gbXVjaCBvciBzYXZpbmcgdG9vIGxpdHRsZSwgcmVsYXRpdmUgdG8gdGhlIHJlY29uY2lsaWF0aW9uIGluc3RydWN0aW9ucyB0byB0aGUgY29tbWl0dGVlOwppc27igJl0IHdpdGhpbiB0aGUganVyaXNkaWN0aW9uIG9mIHRoZSBjb21taXR0ZWUgcmVjb21tZW5kaW5nIHRoZSBwcm92aXNpb247CnJhaXNlcyBkZWZpY2l0cyBpbiBhbnkgeWVhciBhZnRlciB0aGUgcGVyaW9kIGNvdmVyZWQgYnkgdGhlIHJlY29uY2lsaWF0aW9uIGluc3RydWN0aW9ucyB1bmxlc3Mgb3RoZXIgcHJvdmlzaW9ucyBpbmNsdWRlZCBpbiB0aGUgc2FtZSB0aXRsZSBvZiB0aGUgYmlsbCBmdWxseSBvZmZzZXQgdGhvc2Ug4oCcb3V0c2lkZS10aGUtd2luZG934oCdIGNvc3RzO1s5XSBvcgpjaGFuZ2VzIFNvY2lhbCBTZWN1cml0eeKAmXMgcmV0aXJlbWVudCwgc3Vydml2b3JzLCBvciBkaXNhYmlsaXR5IGNvc3RzIG9yIHJldmVudWVzLgpQcm92aXNpb25zIHRoYXQgd291bGQgY3JlYXRlIG5ldyBidWRnZXQgcHJvY2VzcyBydWxlcyBvciBhbHRlciBleGlzdGluZyBjb25ncmVzc2lvbmFsIG9yIHN0YXR1dG9yeSBydWxlcyDigJQgaW5jbHVkaW5nIGJ5IGV4ZW1wdGluZyBwcm92aXNpb25zIG9mIHRoZSByZWNvbmNpbGlhdGlvbiBiaWxsIGZyb20gZXhpc3RpbmcgY29uc3RyYWludHMg4oCUIHZpb2xhdGUgdGhlIEJ5cmQgUnVsZS4gU3VjaCBwcm92aXNpb25zIGFyZSB3aXRoaW4gdGhlIGp1cmlzZGljdGlvbiBvZiB0aGUgU2VuYXRlIEJ1ZGdldCBDb21taXR0ZWUsIG5vdCBvZiBhIGNvbW1pdHRlZSBpbmNsdWRlZCBpbiBhIHJlY29uY2lsaWF0aW9uIGRpcmVjdGl2ZS4gSW4gYWRkaXRpb24sIHRoZSBDb25ncmVzc2lvbmFsIEJ1ZGdldCBPZmZpY2UgKENCTykgaGFzIGEgbG9uZy1zdGFuZGluZyBwb2xpY3kgb2Ygbm90IOKAnHNjb3JpbmfigJ0gc3VjaCBwcm92aXNpb25zIGFzIGRpcmVjdGx5IGNoYW5naW5nIHNwZW5kaW5nIG9yIHJldmVudWVzLgoKRGVjaWRpbmcgd2hldGhlciBhIHByb3Zpc2lvbiB2aW9sYXRlcyB0aGUgQnlyZCBSdWxlIGlzIG9mdGVuIGEganVkZ21lbnQgY2FsbCB0aGF0IGlzIHRyYWRpdGlvbmFsbHkgbWFkZSBieSB0aGUgU2VuYXRlIHBhcmxpYW1lbnRhcmlhbi4gV2hpY2ggY29tbWl0dGVlIGhhcyBqdXJpc2RpY3Rpb24gb3ZlciBhIHByb3Zpc2lvbiwgYW5kIGVzcGVjaWFsbHkgd2hldGhlciBub24tYnVkZ2V0YXJ5IHByb3Zpc2lvbnMgYXJlIGFsbG93YWJsZSB0ZXJtcyBvciBjb25kaXRpb25zIGFuZCB3aGV0aGVyIGJ1ZGdldGFyeSBlZmZlY3RzIGFyZSBub25ldGhlbGVzcyBtZXJlbHkgaW5jaWRlbnRhbCwgYXJlIHN1YmplY3QgdG8gaW50ZXJwcmV0YXRpb24uCgpJdCBpcyBzb21ldGltZXMgZGlmZmljdWx0IHRvIGRldGVybWluZSBpbiBhZHZhbmNlIHdoZXRoZXIgdGhlIGJ1ZGdldGFyeSBlZmZlY3RzIG9mIGEgZ2l2ZW4gcHJvdmlzaW9uIHdpbGwgYmUgY29uc2lkZXJlZCDigJxtZXJlbHkgaW5jaWRlbnRhbCzigJ0gYnV0IHRoZSBwaHJhc2UgaGFzIG5vdCBiZWVuIGludGVycHJldGVkIGFzIHN5bm9ueW1vdXMgd2l0aCDigJx2ZXJ5IHNtYWxs4oCdIGJ1ZGdldGFyeSBlZmZlY3RzLiBGb3IgZXhhbXBsZSwgZHVyaW5nIGNvbnNpZGVyYXRpb24gb2YgdGhlIEFtZXJpY2FuIFJlc2N1ZSBQbGFuLCB0aGUgYnVkZ2V0YXJ5IGVmZmVjdCBvZiBhbiBhbWVuZG1lbnQgdG8gcmFpc2UgdGhlIGZlZGVyYWwgbWluaW11bSB3YWdlIHRvICQxNSBwZXIgaG91ciB3YXMgcnVsZWQgdG8gYmUgbWVyZWx5IGluY2lkZW50YWwgYW5kIHRoZXJlZm9yZSB0byB2aW9sYXRlIHRoZSBCeXJkIFJ1bGUgZXZlbiB0aG91Z2ggdGhlIENCTyBlc3RpbWF0ZWQgdGhhdCBpdCB3b3VsZCBpbmNyZWFzZSBvbi1idWRnZXQgZGVmaWNpdHMgYnkgJDY0IGJpbGxpb24gb3ZlciB0ZW4geWVhcnMuIEFuZCBpbiBTZXB0ZW1iZXIgMjAyMSwgdGhlIFNlbmF0ZSBwYXJsaWFtZW50YXJpYW4gaXNzdWVkIGEgd3JpdHRlbiBvcGluaW9uIHRoYXQgYW4gaW1taWdyYXRpb24gcHJvdmlzaW9uIGluIHBlbmRpbmcgSG91c2UgcmVjb25jaWxpYXRpb24gbGVnaXNsYXRpb24gd291bGQgYmUgY29uc2lkZXJlZCBtZXJlbHkgaW5jaWRlbnRhbCBhbmQgc28gdmlvbGF0ZSB0aGUgQnlyZCBSdWxlIGV2ZW4gdGhvdWdoIENCTyBlc3RpbWF0ZWQgdGhhdCBpdCB3b3VsZCBjb3N0ICQxMjQgYmlsbGlvbiBvdmVyIHRlbiB5ZWFycyBhbmQgYWxtb3N0ICQ3MDAgYmlsbGlvbiBvdmVyIDIwIHllYXJzLiBUaGUgcGFybGlhbWVudGFyaWFuIHBvaW50ZWQgdG8gQ0JP4oCZcyBlc3RpbWF0ZSB0aGF0IHVuZGVyIHRoZSBiaWxsLCA4IG1pbGxpb24gaW5kaXZpZHVhbHMgd291bGQgYWRqdXN0IHRoZWlyIGltbWlncmF0aW9uIHN0YXR1cyB0byBiZWNvbWUgbGF3ZnVsIHBlcm1hbmVudCByZXNpZGVudHMgYW5kIGFyZ3VlZCB0aGF0IHRoaXMg4oCcaXMgYSBwb2xpY3kgY2hhbmdlIHRoYXQgc3Vic3RhbnRpYWxseSBvdXR3ZWlnaHMgdGhlIGJ1ZGdldGFyeSBpbXBhY3Qgb2YgdGhhdCBjaGFuZ2Us4oCdIG1ha2luZyBpdCDigJxub3QgYXBwcm9wcmlhdGUgZm9yIGluY2x1c2lvbiBpbiByZWNvbmNpbGlhdGlvbi7igJ0KCkhvdyBJcyB0aGUgQnlyZCBSdWxlIEVuZm9yY2VkPwpTZW5hdG9ycyBtYXkgcmFpc2UgcG9pbnRzIG9mIG9yZGVyIGFnYWluc3QgYW55IHByb3Zpc2lvbiBvZiBhIGJpbGwgb3IgY29uZmVyZW5jZSBhZ3JlZW1lbnQgdGhhdCB0aGV5IGJlbGlldmUgdG8gYmUgZXh0cmFuZW91cyB1bmRlciB0aGUgQnlyZCBSdWxlLiBUaGV5IG1heSBhbHNvIHJhaXNlIEJ5cmQgUnVsZSBwb2ludHMgb2Ygb3JkZXIgYWdhaW5zdCBhbWVuZG1lbnRzIG9mZmVyZWQgZHVyaW5nIFNlbmF0ZSBjb25zaWRlcmF0aW9uIG9mIHJlY29uY2lsaWF0aW9uIGJpbGxzLgoKSWYgdGhlIHBvaW50IG9mIG9yZGVyIGlzIHN1c3RhaW5lZCBieSB0aGUgcHJlc2lkaW5nIG9mZmljZXIsIHRoZSBleHRyYW5lb3VzIG1hdGVyaWFsIGlzIGRlbGV0ZWQgYW5kIGNvbnNpZGVyYXRpb24gb2YgdGhlIGxlZ2lzbGF0aW9uIGNvbnRpbnVlcyB3aXRoIHRoZSBvZmZlbmRpbmcgbWF0ZXJpYWwgZXhjaXNlZC4gSW4gdGhlIGNhc2Ugb2YgYSBjb25mZXJlbmNlIGFncmVlbWVudCwgdGhlIFNlbmF0ZSBzZW5kcyB0aGUgbGVnaXNsYXRpb24gKG1pbnVzIHRoZSBleHRyYW5lb3VzIHByb3Zpc2lvbnMpIGJhY2sgdG8gdGhlIEhvdXNlIGZvciBmdXJ0aGVyIGFjdGlvbi4gVGhpcyDigJxzdXJnaWNhbOKAnSBlZmZlY3Qgb2YgdGhlIEJ5cmQgUnVsZSBzdGFuZHMgaW4gY29udHJhc3QgdG8gbW9zdCBvdGhlciBDb25ncmVzc2lvbmFsIEJ1ZGdldCBBY3QgcG9pbnRzIG9mIG9yZGVyLCB3aGljaCBjb21wbGV0ZWx5IHN0b3AgY29uc2lkZXJhdGlvbiBvZiBiaWxscyB3aGVyZSB2aW9sYXRpb25zIGFyZSBmb3VuZC4KCkxpa2UgbW9zdCBvdGhlciBIb3VzZSBhbmQgU2VuYXRlIHJ1bGVzLCB0aGUgQnlyZCBSdWxlIGlzIGVuZm9yY2VkIG9ubHkgdGhyb3VnaCBwb2ludHMgb2Ygb3JkZXIgcmFpc2VkIGJ5IG1lbWJlcnMuIE1hdGVyaWFsIHRoYXQgdmlvbGF0ZXMgdGhlIEJ5cmQgUnVsZSBtYXkgcmVtYWluIGluIHJlY29uY2lsaWF0aW9uIGxlZ2lzbGF0aW9uIGlmIG5vIHNlbmF0b3IgbWFrZXMgYW4gb2JqZWN0aW9uLiBGb3IgZXhhbXBsZSwgdGhhdOKAmXMgaG93IENvbmdyZXNzIGhhcyBlbmFjdGVkIGJ1ZGdldCBwcm9jZXNzIGNoYW5nZXMgKHN1Y2ggYXMgYXBwcm9wcmlhdGlvbnMgY2FwcyBvciBwYXktYXMteW91LWdvIHJ1bGVzKSB0aHJvdWdoIHJlY29uY2lsaWF0aW9uLCBldmVuIHRob3VnaCB0aGV5IGFyZSBjb25zaWRlcmVkIGV4dHJhbmVvdXMgdW5kZXIgdGhlIEJ5cmQgUnVsZSBiZWNhdXNlIHRoZXkgZG9u4oCZdCBkaXJlY3RseSBjaGFuZ2Ugc3BlbmRpbmcgb3IgcmV2ZW51ZSBsZXZlbHMuCgpBbHNvLCB0aGUgQ29uZ3Jlc3Npb25hbCBCdWRnZXQgQWN0IGFsbG93cyB0aGUgU2VuYXRlIHRvIHdhaXZlLCB3aXRoIGEgdGhyZWUtZmlmdGhzIHZvdGUsIGFwcGxpY2F0aW9uIG9mIHRoZSBCeXJkIFJ1bGUgdG8gYW55IHBhcnRpY3VsYXIgcHJvdmlzaW9uIG9mIChvciBhbWVuZG1lbnQgdG8pIGEgcmVjb25jaWxpYXRpb24gYmlsbC4KCkFyZSBSZWNvbmNpbGlhdGlvbiBCaWxscyBTdWJqZWN0IHRvIE90aGVyIEJ1ZGdldCBSdWxlcz8KWWVzLiBJbiBhZGRpdGlvbiB0byB0aGUgc3BlY2lmaWMgcnVsZXMgZm9yIHJlY29uY2lsaWF0aW9uLCBnZW5lcmFsIGJ1ZGdldCBydWxlcyBhbHNvIGFwcGx5LCBtYW55IG9mIHdoaWNoIHJlcXVpcmUgYSB0aHJlZS1maWZ0aHMgbWFqb3JpdHkgdm90ZSBpbiB0aGUgU2VuYXRlIHRvIHdhaXZlLiBGdXJ0aGVyIGNvbXBsaWNhdGlvbnMgYXJpc2UgYmVjYXVzZSB0aGUgQnlyZCBSdWxlIGNsYXNzaWZpZXMgYXMgZXh0cmFuZW91cywgYW5kIHRodXMgc3ViamVjdCB0byBhIHN1cGVyLW1ham9yaXR5IHBvaW50IG9mIG9yZGVyLCBwcm92aXNpb25zIGluIHJlY29uY2lsaWF0aW9uIGJpbGxzIHRoYXQgZXN0YWJsaXNoLCBtb2RpZnksIG9yIHN1c3BlbmQgYnVkZ2V0IHJ1bGVzLiBUaGlzIGluY2x1ZGVzIGVtZXJnZW5jeSBkZXNpZ25hdGlvbnMsIHdoaWNoIHdvdWxkIG90aGVyd2lzZSBleGVtcHQgdGhlIGRlc2lnbmF0ZWQgaXRlbXMgZnJvbSBjb25ncmVzc2lvbmFsIG9yIHN0YXR1dG9yeSBidWRnZXQgY29udHJvbHMuWzEwXQoKVmFyaW91cyBtZWNoYW5pc21zIGFyZSBhdmFpbGFibGUsIGhvd2V2ZXIsIHRvIG1vZGlmeSBvciBsaW1pdCB0aGUgYXBwbGljYXRpb24gb2Ygc29tZSBidWRnZXQgcnVsZXMgdG8gcmVjb25jaWxpYXRpb24gbWVhc3VyZXMuIEZvciBpbnN0YW5jZSwgYSBidWRnZXQgcmVzb2x1dGlvbiB3aWxsIHR5cGljYWxseSBhY2NvbW1vZGF0ZSB0aGUgcmVjb25jaWxpYXRpb24gbWVhc3VyZXMgaXQgdHJpZ2dlcnMsIGVpdGhlciBieSBzZXR0aW5nIGl0cyBsZXZlbHMgdG8gbWF0Y2ggdGhlIGludGVuZGVkIGxlZ2lzbGF0aW9uIG9yLCBpZiB0aGUgcmVjb25jaWxpYXRpb24gaW5zdHJ1Y3Rpb25zIGFyZSBvcGVuLWVuZGVkLCBieSBhbGxvd2luZyB0aGUgQnVkZ2V0IENvbW1pdHRlZSBjaGFpciB0byBhZGp1c3QgdGhlIGxldmVscyBpbiB0aGUgYnVkZ2V0IHJlc29sdXRpb24gdG8gYWNjb21tb2RhdGUgYSByZWNvbmNpbGlhdGlvbiBiaWxsIHRoYXQgaXMgb3RoZXJ3aXNlIGluIGNvbXBsaWFuY2UuCgpCdXQgYnVkZ2V0IGxpbWl0cyBzZXQgaW4gbGF3IGFyZSBtb3JlIGRpZmZpY3VsdCB0byB3YWl2ZSBvciBzdXNwZW5kLiBUaGVzZSBpbmNsdWRlIHRoZSBTdGF0dXRvcnkgUGF5LUFzLVlvdS1HbyBBY3QsWzExXSB3aGljaCBlc3NlbnRpYWxseSByZXF1aXJlcyB0aGF0IGFsbCBsZWdpc2xhdGlvbiBlbmFjdGVkIGR1cmluZyBhIHNlc3Npb24gb2YgQ29uZ3Jlc3Mgb3IgdGhlIHByaW9yIG5pbmUgeWVhcnMsIHRha2VuIHRvZ2V0aGVyLCBub3QgcHJvZHVjZSBhIG5ldCBpbmNyZWFzZSBpbiB0aGUgYnVkZ2V0IGRlZmljaXQuIElmIHRoYXQgcnVsZSBpcyB2aW9sYXRlZCwgdGhlIGxhdyByZXF1aXJlcyBhdXRvbWF0aWMgc3BlbmRpbmcgY3V0cyAo4oCcc2VxdWVzdHJhdGlvbuKAnSkgaW4gbm9uLWV4ZW1wdCBtYW5kYXRvcnkgcHJvZ3JhbXMgYWZ0ZXIgdGhlIHNlc3Npb24gaXMgb3ZlciwgdG8gZWxpbWluYXRlIHRoZSBuZXQgZGVmaWNpdCBpbmNyZWFzZS4gTGFuZ3VhZ2UgaW5jbHVkZWQgaW4gYSByZWNvbmNpbGlhdGlvbiBiaWxsIHRvIGV4ZW1wdCBzcGVuZGluZyBvciB0YXggY3V0IHByb3Zpc2lvbnMgZnJvbSB0aGUgUGF5LUFzLVlvdS1HbyBBY3QgKHRocm91Z2ggZW1lcmdlbmN5IGRlc2lnbmF0aW9ucyBvciBvdGhlciBkZXZpY2VzKSB3b3VsZCBmYWNlIGEgc3VwZXItbWFqb3JpdHkgcG9pbnQgb2Ygb3JkZXIgdW5kZXIgdGhlIEJ5cmQgUnVsZS4KCkluIHJlY2VudCB5ZWFycywgd2hlbiBuZXQgZGVmaWNpdCBpbmNyZWFzZXMgZW5hY3RlZCBpbiByZWNvbmNpbGlhdGlvbiBiaWxscyB3b3VsZCB0cmlnZ2VyIGEgbGF0ZXIgcGF5LWFzLXlvdS1nbyBzZXF1ZXN0cmF0aW9uLCBDb25ncmVzcyBoYXMgYXZvaWRlZCB0aGF0IHJlc3VsdCB3aXRoIGxhbmd1YWdlIGluY2x1ZGVkIGluIHN1YnNlcXVlbnQgbGVnaXNsYXRpb24uWzEyXSBUaGVyZSBoYXMgZ2VuZXJhbGx5IGJlZW4gYmlwYXJ0aXNhbiBzdXBwb3J0IGZvciwgb3IgbGVhc3QgYWNxdWllc2NlbmNlIHRvLCBkb2luZyBzbywgc2luY2UgcmVnYXJkbGVzcyBvZiB2aWV3cyBvbiB0aGUgbGVnaXNsYXRpb24gbGVhZGluZyB0byB0aGUgdmlvbGF0aW9uLCB0aGVyZSB3YXMgbGl0dGxlIHN1cHBvcnQgZm9yIHRoZSBhdXRvbWF0aWMgY3V0cyBpbiBwcm9ncmFtcyBzdWNoIGFzIE1lZGljYXJlIHBheW1lbnRzIGFuZCBmYXJtIHByaWNlIHN1cHBvcnRzIHRoYXQgdGhlIFBheS1Bcy1Zb3UtR28gQWN0IHdvdWxkIHRyaWdnZXIu",
//               question: "What are the approval steps?",
//               worker_name: "stepfunction2"
//             })
//           });
  
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
        
//           const data: ChatApiResponse = await response.json();
// //           localStorage.setItem('drawio-diagram', `
// //             <mxfile host="app.diagrams.net" agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36" version="28.1.2">
// //   <diagram id="07fea595-8f29-1299-0266-81d95cde20df" name="Page-1">
// //     <mxGraphModel dx="1214" dy="867" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" background="#ffffff" math="0" shadow="0">
// //       <root>
// //         <mxCell id="0" />
// //         <mxCell id="1" parent="0" />
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-313" value="&lt;font color=&quot;#23497d&quot;&gt;Inside Sales Rep&lt;/font&gt;" style="swimlane;whiteSpace=wrap;fillColor=none;swimlaneFillColor=#BAC8D3;fontColor=#2F5B7C;fontFamily=Tahoma;html=1;strokeColor=none;opacity=50;" vertex="1" parent="1">
// //           <mxGeometry x="250" y="210" width="160" height="650" as="geometry">
// //             <mxRectangle x="20" y="20" width="80" height="23" as="alternateBounds" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-314" value="Customer Management" style="whiteSpace=wrap;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;plain-purple;strokeColor=none;fillColor=#2f5b7c;gradientColor=none;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-313">
// //           <mxGeometry x="20" y="60" width="120" height="60" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-315" value="Credit Management" style="whiteSpace=wrap;strokeColor=none;fillColor=#2f5b7c;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-313">
// //           <mxGeometry x="20" y="375" width="120" height="60" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-316" value="Price Management" style="whiteSpace=wrap;strokeColor=none;fillColor=#2f5b7c;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-313">
// //           <mxGeometry x="20" y="485" width="120" height="60" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-317" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="eHIFP4p37Z23MNbaOak_-313" source="eHIFP4p37Z23MNbaOak_-315" target="eHIFP4p37Z23MNbaOak_-316">
// //           <mxGeometry width="100" height="100" relative="1" as="geometry">
// //             <mxPoint x="170" y="397.5" as="sourcePoint" />
// //             <mxPoint x="270" y="472.5" as="targetPoint" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-318" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="eHIFP4p37Z23MNbaOak_-313" source="eHIFP4p37Z23MNbaOak_-314" target="eHIFP4p37Z23MNbaOak_-315">
// //           <mxGeometry width="100" height="100" relative="1" as="geometry">
// //             <mxPoint x="160" y="110" as="sourcePoint" />
// //             <mxPoint x="260" y="185" as="targetPoint" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-319" value="&lt;font color=&quot;#23497d&quot;&gt;Inside Sales Manager&lt;/font&gt;" style="swimlane;whiteSpace=wrap;fillColor=none;swimlaneFillColor=#BAC8D3;fontColor=#2F5B7C;fontFamily=Tahoma;html=1;strokeColor=none;opacity=25;" vertex="1" parent="1">
// //           <mxGeometry x="1050" y="210" width="160" height="650" as="geometry">
// //             <mxRectangle x="20" y="20" width="80" height="23" as="alternateBounds" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-320" value="Sales Contract" style="shape=document;whiteSpace=wrap;verticalAlign=middle;strokeColor=none;fillColor=#12aab5;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;spacingBottom=22;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-319">
// //           <mxGeometry x="20" y="50" width="120" height="80" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-321" value="Bills" style="shape=document;whiteSpace=wrap;verticalAlign=middle;strokeColor=none;fillColor=#12aab5;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;spacingBottom=22;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-319">
// //           <mxGeometry x="20" y="530" width="120" height="80" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-322" value="Cost Allocation" style="whiteSpace=wrap;strokeColor=none;fillColor=#2f5b7c;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-319">
// //           <mxGeometry x="20" y="305" width="120" height="60" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-323" value="&lt;font color=&quot;#23497d&quot;&gt;VP Sales&lt;/font&gt;" style="swimlane;whiteSpace=wrap;fillColor=none;swimlaneFillColor=#BAC8D3;fontColor=#2F5B7C;fontFamily=Tahoma;html=1;strokeColor=none;opacity=50;" vertex="1" parent="1">
// //           <mxGeometry x="890" y="210" width="160" height="650" as="geometry">
// //             <mxRectangle x="20" y="20" width="80" height="23" as="alternateBounds" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-324" value="Outbound Accounting" style="whiteSpace=wrap;fillColor=#2f5b7c;strokeColor=none;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-323">
// //           <mxGeometry x="20" y="160" width="120" height="60" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-325" value="Account Processing" style="whiteSpace=wrap;strokeColor=none;fillColor=#2f5b7c;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-323">
// //           <mxGeometry x="20" y="420" width="120" height="60" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-326" value="&lt;font color=&quot;#23497d&quot;&gt;Sales Admin&lt;/font&gt;" style="swimlane;whiteSpace=wrap;fillColor=none;swimlaneFillColor=#BAC8D3;fontColor=#2F5B7C;fontFamily=Tahoma;html=1;strokeColor=none;opacity=25;" vertex="1" parent="1">
// //           <mxGeometry x="410" y="210" width="160" height="650" as="geometry">
// //             <mxRectangle x="20" y="20" width="80" height="23" as="alternateBounds" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-327" value="Material Requirements Planning Operation" style="whiteSpace=wrap;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;plain-purple;strokeColor=none;fillColor=#2f5b7c;gradientColor=none;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-326">
// //           <mxGeometry x="20" y="165" width="120" height="60" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-328" value="&lt;font color=&quot;#ffffff&quot;&gt;Facilities Procurement&lt;br&gt;Application&lt;/font&gt;&lt;br&gt; " style="shape=document;whiteSpace=wrap;verticalAlign=middle;strokeColor=none;fillColor=#12aab5;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;spacingBottom=22;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-326">
// //           <mxGeometry x="20" y="265" width="120" height="80" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-329" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="eHIFP4p37Z23MNbaOak_-326" source="eHIFP4p37Z23MNbaOak_-327" target="eHIFP4p37Z23MNbaOak_-328">
// //           <mxGeometry width="100" height="100" relative="1" as="geometry">
// //             <mxPoint x="-10" y="100" as="sourcePoint" />
// //             <mxPoint x="90" y="175" as="targetPoint" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-330" value="&lt;font color=&quot;#23497d&quot;&gt;Sales Representative&lt;/font&gt;" style="swimlane;whiteSpace=wrap;fillColor=none;swimlaneFillColor=#BAC8D3;fontColor=#2F5B7C;fontFamily=Tahoma;html=1;strokeColor=none;opacity=50;" vertex="1" parent="1">
// //           <mxGeometry x="570" y="210" width="160" height="650" as="geometry">
// //             <mxRectangle x="20" y="20" width="80" height="23" as="alternateBounds" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-331" value="Product Quotations" style="shape=document;whiteSpace=wrap;verticalAlign=middle;strokeColor=none;fillColor=#12aab5;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;spacingBottom=22;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-330">
// //           <mxGeometry x="20" y="50" width="120" height="80" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-332" value="Orders" style="shape=document;whiteSpace=wrap;verticalAlign=middle;strokeColor=none;fillColor=#12aab5;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;spacingBottom=22;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-330">
// //           <mxGeometry x="20" y="225" width="120" height="80" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-333" value="Product Delivery Notification" style="shape=document;whiteSpace=wrap;strokeColor=none;fillColor=#12aab5;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;verticalAlign=middle;spacing=6;spacingBottom=22;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-330">
// //           <mxGeometry x="20" y="400" width="120" height="80" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-334" value="Invoice" style="shape=document;whiteSpace=wrap;verticalAlign=middle;strokeColor=none;fillColor=#12aab5;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;spacingBottom=22;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-330">
// //           <mxGeometry x="20" y="520" width="120" height="80" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-335" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#12AAB5;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="eHIFP4p37Z23MNbaOak_-330" source="eHIFP4p37Z23MNbaOak_-333" target="eHIFP4p37Z23MNbaOak_-334">
// //           <mxGeometry width="100" height="100" relative="1" as="geometry">
// //             <mxPoint x="-80" y="375" as="sourcePoint" />
// //             <mxPoint x="60" y="490" as="targetPoint" />
// //             <Array as="points">
// //               <mxPoint x="53" y="501" />
// //               <mxPoint x="53" y="501" />
// //             </Array>
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-336" value="&lt;font color=&quot;#23497d&quot;&gt;Sales Manager&lt;/font&gt;" style="swimlane;whiteSpace=wrap;fillColor=none;swimlaneFillColor=#BAC8D3;fontColor=#2F5B7C;fontFamily=Tahoma;html=1;strokeColor=none;opacity=25;" vertex="1" parent="1">
// //           <mxGeometry x="730" y="210" width="160" height="650" as="geometry">
// //             <mxRectangle x="20" y="20" width="80" height="23" as="alternateBounds" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-337" value="Inventory Control" style="whiteSpace=wrap;strokeColor=none;fillColor=#2f5b7c;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-336">
// //           <mxGeometry x="20" y="160" width="120" height="60" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-338" value="Product Delivery" style="whiteSpace=wrap;strokeColor=none;fillColor=#2f5b7c;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-336">
// //           <mxGeometry x="20" y="315" width="120" height="60" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-339" value="Director" style="swimlane;whiteSpace=wrap;fillColor=none;swimlaneFillColor=#BAC8D3;fontColor=#2F5B7C;fontFamily=Tahoma;html=1;strokeColor=none;opacity=50;" vertex="1" parent="1">
// //           <mxGeometry x="1210" y="210" width="160" height="650" as="geometry">
// //             <mxRectangle x="20" y="20" width="80" height="23" as="alternateBounds" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-340" value="Outbounding Management" style="shape=document;whiteSpace=wrap;verticalAlign=middle;strokeColor=none;fillColor=#12aab5;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;spacingBottom=22;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-339">
// //           <mxGeometry x="20" y="130" width="120" height="80" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-341" value="Resources Allocation" style="whiteSpace=wrap;strokeColor=none;fillColor=#2f5b7c;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-339">
// //           <mxGeometry x="20" y="255" width="120" height="60" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-342" value="Long Term Strategy" style="whiteSpace=wrap;strokeColor=none;fillColor=#2f5b7c;shadow=0;fontColor=#FFFFFF;fontFamily=Helvetica;fontStyle=0;html=1;fontSize=12;spacing=6;verticalAlign=middle;" vertex="1" parent="eHIFP4p37Z23MNbaOak_-339">
// //           <mxGeometry x="20" y="400" width="120" height="60" as="geometry" />
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-343" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="eHIFP4p37Z23MNbaOak_-339" source="eHIFP4p37Z23MNbaOak_-341" target="eHIFP4p37Z23MNbaOak_-342">
// //           <mxGeometry width="100" height="100" relative="1" as="geometry">
// //             <mxPoint x="30" y="570" as="sourcePoint" />
// //             <mxPoint x="130" y="470" as="targetPoint" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-344" value="" style="edgeStyle=segmentEdgeStyle;entryX=0.25;entryY=0;strokeColor=#12AAB5;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="eHIFP4p37Z23MNbaOak_-339" source="eHIFP4p37Z23MNbaOak_-340" target="eHIFP4p37Z23MNbaOak_-341">
// //           <mxGeometry width="100" height="100" relative="1" as="geometry">
// //             <mxPoint x="-120" y="260" as="sourcePoint" />
// //             <mxPoint x="-20" y="160" as="targetPoint" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-345" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-314" target="eHIFP4p37Z23MNbaOak_-327">
// //           <mxGeometry x="164.5" y="178.5" width="100" height="100" as="geometry">
// //             <mxPoint x="450" y="370" as="sourcePoint" />
// //             <mxPoint x="550" y="270" as="targetPoint" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-346" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#12AAB5;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-328" target="eHIFP4p37Z23MNbaOak_-315">
// //           <mxGeometry x="164.5" y="433.5" width="100" height="100" as="geometry">
// //             <mxPoint x="500" y="445" as="sourcePoint" />
// //             <mxPoint x="500" y="485" as="targetPoint" />
// //             <Array as="points">
// //               <mxPoint x="460" y="615" />
// //             </Array>
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-347" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-314" target="eHIFP4p37Z23MNbaOak_-331">
// //           <mxGeometry x="164.5" y="178.5" width="100" height="100" as="geometry">
// //             <mxPoint x="400" y="310" as="sourcePoint" />
// //             <mxPoint x="500" y="385" as="targetPoint" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-348" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#12AAB5;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-328" target="eHIFP4p37Z23MNbaOak_-333">
// //           <mxGeometry x="234.5" y="433.5" width="100" height="100" as="geometry">
// //             <mxPoint x="610" y="940" as="sourcePoint" />
// //             <mxPoint x="710" y="840" as="targetPoint" />
// //             <Array as="points">
// //               <mxPoint x="460" y="650" />
// //             </Array>
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-349" value="" style="edgeStyle=elbowEdgeStyle;elbow=vertical;strokeColor=#12AAB5;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-334" target="eHIFP4p37Z23MNbaOak_-321">
// //           <mxGeometry x="484.5" y="623.5" width="100" height="100" as="geometry">
// //             <mxPoint x="770" y="740" as="sourcePoint" />
// //             <mxPoint x="870" y="640" as="targetPoint" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-350" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-327" target="eHIFP4p37Z23MNbaOak_-332">
// //           <mxGeometry x="324.5" y="283.5" width="100" height="100" as="geometry">
// //             <mxPoint x="680" y="420" as="sourcePoint" />
// //             <mxPoint x="780" y="320" as="targetPoint" />
// //             <Array as="points" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-351" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#12AAB5;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-331" target="eHIFP4p37Z23MNbaOak_-337">
// //           <mxGeometry x="484.5" y="178.5" width="100" height="100" as="geometry">
// //             <mxPoint x="670" y="370" as="sourcePoint" />
// //             <mxPoint x="770" y="270" as="targetPoint" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-352" value="" style="edgeStyle=none;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-337" target="eHIFP4p37Z23MNbaOak_-324">
// //           <mxGeometry x="644.5" y="278.5" width="100" height="100" as="geometry">
// //             <mxPoint x="910" y="580" as="sourcePoint" />
// //             <mxPoint x="1010" y="480" as="targetPoint" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-353" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#12AAB5;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-332" target="eHIFP4p37Z23MNbaOak_-338">
// //           <mxGeometry x="404.5" y="393.5" width="100" height="100" as="geometry">
// //             <mxPoint x="750" y="610" as="sourcePoint" />
// //             <mxPoint x="850" y="510" as="targetPoint" />
// //             <Array as="points">
// //               <mxPoint x="630" y="560" />
// //             </Array>
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-354" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-338" target="eHIFP4p37Z23MNbaOak_-324">
// //           <mxGeometry x="644.5" y="308.5" width="100" height="100" as="geometry">
// //             <mxPoint x="870" y="560" as="sourcePoint" />
// //             <mxPoint x="970" y="460" as="targetPoint" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-355" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-338" target="eHIFP4p37Z23MNbaOak_-325">
// //           <mxGeometry x="644.5" y="433.5" width="100" height="100" as="geometry">
// //             <mxPoint x="740" y="710" as="sourcePoint" />
// //             <mxPoint x="840" y="610" as="targetPoint" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-356" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-324" target="eHIFP4p37Z23MNbaOak_-320">
// //           <mxGeometry x="744.5" y="178.5" width="100" height="100" as="geometry">
// //             <mxPoint x="1090" y="500" as="sourcePoint" />
// //             <mxPoint x="1190" y="400" as="targetPoint" />
// //             <Array as="points">
// //               <mxPoint x="970" y="300" />
// //             </Array>
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-357" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-324" target="eHIFP4p37Z23MNbaOak_-322">
// //           <mxGeometry x="804.5" y="278.5" width="100" height="100" as="geometry">
// //             <mxPoint x="1080" y="510" as="sourcePoint" />
// //             <mxPoint x="1180" y="410" as="targetPoint" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-358" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-325" target="eHIFP4p37Z23MNbaOak_-321">
// //           <mxGeometry x="804.5" y="538.5" width="100" height="100" as="geometry">
// //             <mxPoint x="1110" y="700" as="sourcePoint" />
// //             <mxPoint x="1210" y="600" as="targetPoint" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-359" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#2F5B7C;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-322" target="eHIFP4p37Z23MNbaOak_-342">
// //           <mxGeometry x="964.5" y="423.5" width="100" height="100" as="geometry">
// //             <mxPoint x="1320" y="620" as="sourcePoint" />
// //             <mxPoint x="1420" y="520" as="targetPoint" />
// //           </mxGeometry>
// //         </mxCell>
// //         <mxCell id="eHIFP4p37Z23MNbaOak_-360" value="" style="edgeStyle=segmentEdgeStyle;strokeColor=#12AAB5;strokeWidth=3;html=1;endArrow=block;endFill=1;" edge="1" parent="1" source="eHIFP4p37Z23MNbaOak_-320" target="eHIFP4p37Z23MNbaOak_-340">
// //           <mxGeometry x="964.5" y="178.5" width="100" height="100" as="geometry">
// //             <mxPoint x="1080" y="470" as="sourcePoint" />
// //             <mxPoint x="1180" y="370" as="targetPoint" />
// //           </mxGeometry>
// //         </mxCell>
// //       </root>
// //     </mxGraphModel>
// //   </diagram>
// // </mxfile>

// //             `)
        
//           return data;
//       };
  

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    // Remove the data URL prefix (e.g., "data:text/plain;base64,")
                    const base64Content = reader.result.split(',')[1];
                    resolve(base64Content);
                } else {
                    reject(new Error('Failed to read file'));
                }
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { sender: USER, text: input };
        setMessages(prev => [...prev, userMessage]);

        const tempInput = input;
        setInput('');

        try {
            setIsLoading(true);
            let data: ChatApiResponse;
            
            if (selectedFile === null) {
                data = await sendChatRequest(tempInput);
            } else {
                const fileContent = await convertFileToBase64(selectedFile);
                data = await sendFileQuestionRequest(
                    tempInput,
                    selectedFile.name,
                    fileContent,
                );
                setSelectedFile(null);
            }

            // data = {
            //     type: 'question',
            //     session_id: '',
            //     answer: 'No response received.',
            //     outputXml: XMLResponse
            // }
            
            const botMessage: Message = {
                sender: BOT,
                text: data.answer || 'No response received.',
                xmlOutput: data.outputXml || ''
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (err: unknown) {
            console.error(err);
            const botMessage: Message = {
                sender: BOT,
                text: `Sorry, I couldn't process your message. Please try again.`
            };
            setMessages(prev => [...prev, botMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // const handleSend = async () => {
    //     if (!input.trim()) return;

    //     const userMessage: Message = { sender: USER, text: input };
    //     setMessages(prev => [...prev, userMessage]);
    //     setInput('');

    //     try {
    //         // const data = [
    //         //     {"org": "Congress", "team": "House & Senate", "actor": "Members", "text": "Adopt a budget resolution with reconciliation directives", "type": "STEP", "code": "PR.1", "from": null, "to": "PR.2"},
    //         //     {"org": "Congress", "team": "House & Senate", "actor": "Members", "text": "Decide whether to include reconciliation directives", "type": "DECISION", "code": "PR.2", "from": "PR.1", "yes": "PR.3", "no": null},
    //         //     {"org": "Congress", "team": "Committees", "actor": "Specified Committees", "text": "Prepare and report legislation by a deadline to meet reconciliation targets", "type": "STEP", "code": "PR.3", "from": "PR.2", "to": "PR.4"},
    //         //     {"org": "Congress", "team": "Committees", "actor": "Committees", "text": "Vote on legislation to implement part of the package", "type": "STEP", "code": "PR.4", "from": "PR.3", "to": "PR.5"},
    //         //     {"org": "Congress", "team": "Committees", "actor": "Committees", "text": "Committee fails to act or falls short of target?", "type": "DECISION", "code": "PR.5", "from": "PR.4", "yes": "PR.6", "no": "PR.7"},
    //         //     {"org": "Congress", "team": "Budget Committee", "actor": "Budget Committee Chair", "text": "Offer floor amendments to meet reconciliation target", "type": "STEP", "code": "PR.6", "from": "PR.5", "to": "PR.7"},
    //         //     {"org": "Congress", "team": "Senate", "actor": "Senate Leadership", "text": "Optionally bypass formal committee process and take House-passed reconciliation bill directly to the floor", "type": "DECISION", "code": "PR.7", "from": "PR.6", "yes": "PR.8", "no": "PR.9"},
    //         //     {"org": "Congress", "team": "Budget Committees", "actor": "House & Senate Budget Committees", "text": "Assemble committee recommendations into omnibus reconciliation bill", "type": "STEP", "code": "PR.8", "from": "PR.7", "to": "PR.9"},
    //         //     {"org": "Congress", "team": "House or Senate", "actor": "Full Chamber", "text": "Consider reconciliation bill on chamber floor", "type": "STEP", "code": "PR.9", "from": "PR.8", "to": "PR.10"},
    //         //     {"org": "Congress", "team": "House or Senate", "actor": "Members", "text": "Offer amendments during floor consideration", "type": "STEP", "code": "PR.10", "from": "PR.9", "to": "PR.11"},
    //         //     {"org": "Congress", "team": "House", "actor": "Rules Committee", "text": "Adopt a special rule specifying debate time and allowed amendments", "type": "STEP", "code": "PR.11", "from": "PR.10", "to": "PR.12"},
    //         //     {"org": "Congress", "team": "Senate", "actor": "Senators", "text": "Debate reconciliation bill for up to 20 hours", "type": "STEP", "code": "PR.12", "from": "PR.11", "to": "PR.13"},
    //         //     {"org": "Congress", "team": "Senate", "actor": "Senators", "text": "Proceed to vote-a-rama on remaining amendments with little or no debate", "type": "STEP", "code": "PR.13", "from": "PR.12", "to": "PR.14"},
    //         //     {"org": "Congress", "team": "Senate", "actor": "Senators", "text": "Raise Byrd Rule points of order against extraneous provisions", "type": "DECISION", "code": "PR.14", "from": "PR.13", "yes": "PR.15", "no": "PR.16"},
    //         //     {"org": "Congress", "team": "Senate", "actor": "Presiding Officer", "text": "Sustain Byrd Rule objection and delete extraneous provisions", "type": "STEP", "code": "PR.15", "from": "PR.14", "to": "PR.16"},
    //         //     {"org": "Congress", "team": "Senate", "actor": "Senators", "text": "Vote to waive Byrd Rule with three-fifths majority", "type": "DECISION", "code": "PR.16", "from": "PR.15", "yes": "PR.17", "no": "PR.15"},
    //         //     {"org": "Congress", "team": "House & Senate", "actor": "Members", "text": "House and Senate pass different versions of reconciliation bill?", "type": "DECISION", "code": "PR.17", "from": "PR.16", "yes": "PR.18", "no": "PR.19"},
    //         //     {"org": "Congress", "team": "House & Senate", "actor": "Conference Committee", "text": "Negotiate compromise via conference committee or amendment exchange", "type": "STEP", "code": "PR.18", "from": "PR.17", "to": "PR.19"},
    //         //     {"org": "Congress", "team": "House & Senate", "actor": "Members", "text": "Vote on final compromise version", "type": "STEP", "code": "PR.19", "from": "PR.18", "to": "PR.20"},
    //         //     {"org": null, "team": null, "actor": "President", "text": "Sign reconciliation bill into law?", "type": "DECISION", "code": "PR.20", "from": "PR.19", "yes": null, "no": "PR.21"},
    //         //     {"org": null, "team": null, "actor": "President", "text": "Veto reconciliation bill", "type": "STEP", "code": "PR.21", "from": "PR.20", "to": "PR.22"},
    //         //     {"org": "Congress", "team": "House & Senate", "actor": "Members", "text": "Attempt to override veto", "type": "DECISION", "code": "PR.22", "from": "PR.21", "yes": null, "no": "PR.23"},
    //         //     {"org": "Congress", "team": "House & Senate", "actor": "Members", "text": "If veto sustained, adopt or revise budget resolution to restart reconciliation process", "type": "STEP", "code": "PR.23", "from": "PR.22", "to": "PR.1"},
    //         // ]

    //         const data = [
    //             {
    //             "org": "Congress (Joint)",
    //             "team": "Budget Resolution",
    //             "actor": "House & Senate Leadership",
    //             "text": "Adopt budget resolution with reconciliation directives",
    //             "type": "Start",
    //             "code": "PR.0",
    //             "from": null,
    //             "to": "PR.1"
    //             },
    //             {
    //             "org": "Congress",
    //             "team": "Committees",
    //             "actor": "Authorizing & Tax/Spending Committees",
    //             "text": "Committees draft legislation per reconciliation directives",
    //             "type": "Step",
    //             "code": "PR.1",
    //             "from": "PR.0",
    //             "to": "PR.2"
    //             },
    //             {
    //             "org": "Congress",
    //             "team": "Committees",
    //             "actor": "House & Senate Budget Committees",
    //             "text": "Assemble recommendations into a single reconciliation bill",
    //             "type": "Step",
    //             "code": "PR.2",
    //             "from": "PR.1",
    //             "to": "PR.3"
    //             },
    //             {
    //             "org": "Congress",
    //             "team": "House of Representatives",
    //             "actor": "Members & Leadership",
    //             "text": "House considers reconciliation bill (debate, amendments, vote)",
    //             "type": "Step",
    //             "code": "PR.3",
    //             "from": "PR.2",
    //             "to": "PR.4"
    //             },
    //             {
    //             "org": "Congress",
    //             "team": "Senate",
    //             "actor": "Senators & Leadership",
    //             "text": "Senate considers reconciliation bill (20-hour limit, Byrd Rule, vote)",
    //             "type": "Step",
    //             "code": "PR.4",
    //             "from": "PR.3",
    //             "to": "PR.5"
    //             },
    //             {
    //             "org": "Congress",
    //             "team": "House & Senate",
    //             "actor": "Leadership / Conferees",
    //             "text": "Do House and Senate pass identical versions?",
    //             "type": "Decision",
    //             "code": "PR.5",
    //             "from": "PR.4",
    //             "yes": "PR.6",
    //             "no": "PR.3"
    //             },
    //             {
    //             "org": "Executive Branch",
    //             "team": "President",
    //             "actor": "President",
    //             "text": "Sign reconciliation bill into law",
    //             "type": "End",
    //             "code": "PR.6",
    //             "from": "PR.5",
    //             "to": null
    //             }
    //         ];

    //         const mermaidChart = flowChartWithGroups(data as StepNode[]);

    //         console.log(mermaidChart);
            

    //         const botMessage: Message = {
    //             sender: BOT,
    //             text: `mermaid:\n${mermaidChart}`
    //         };

    //         setMessages(prev => [...prev, botMessage]);
    //     } catch (err: unknown) {
    //         const botMessage: Message = {
    //             sender: BOT,
    //             text: `Sorry, I couldn't fetch the flowchart. ${err}`
    //         };
    //         setMessages(prev => [...prev, botMessage]);
    //     }
    // };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files?.length) {
            setSelectedFile(files[0]);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex flex-col h-[calc(100vh-3rem)] bg-white">
            <main className="flex-1 overflow-y-auto px-4 py-6 bg-white">
                <div className="mx-auto max-w-4xl space-y-4">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`chat ${msg.sender === USER ? 'chat-end' : 'chat-start'}`}
                        >
                            <div
                                className={`max-w-full px-4 py-3 whitespace-pre-wrap rounded-2xl shadow-md transition-all select-text ${
                                    msg.sender === USER
                                        ? 'bg-black text-white'
                                        : 'bg-gray-100 text-black border border-gray-200'
                                }
                                ${msg.xmlOutput ? 'w-screen' : ''}
                                `}
                                style={{maxWidth: '600px'}}
                            >
                                {msg.text && (
                                    <div className={msg.xmlOutput ? 'mb-4' : ''}>
                                        {msg.text}
                                    </div>
                                )}

                                {msg.xmlOutput && (
                                    <div className="w-full">
                                        <DrawioChart xml={msg.xmlOutput} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="chat chat-start">
                            <div className="max-w-full px-4 py-3 rounded-2xl shadow-md bg-gray-100 text-black border border-gray-200 flex items-center space-x-3">
                                <span className="loading loading-dots loading-sm"></span>
                                <span className="text-gray-600">Oecora is thinking...</span>
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef}/>
                </div>
            </main>

            <footer className="p-4 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto w-full bg-white border relative border-gray-200 rounded-2xl px-4 py-3 shadow-sm transition flex flex-col gap-2">
                    <textarea
                        ref={textareaRef}
                        placeholder="Message Oecora..."
                        className="w-full bg-transparent outline-none text-black placeholder-gray-500 px-2 resize-none overflow-y-auto focus:ring-0"
                        style={{minHeight: '40px', maxHeight: '100px'}}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        rows={1}
                    />

                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <label className="flex items-center text-gray-500 hover:text-black p-1.5 rounded-full transition space-x-1 cursor-pointer">
                                <FiPaperclip size={20}/>
                                <span className="select-none">Attach</span>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="*/*"
                                    />
                            </label>

                            {selectedFile !== null ? (
                            <div className="flex bg-gray-800 rounded-lg py-1.5 px-2.5 border gap-1 border-gray-700 max-w-xs">
                                <p className="text-sm font-medium truncate" title={selectedFile.name}>
                                    {selectedFile.name}
                                </p>
                                
                                <button
                                    onClick={removeFile}
                                    className="text-gray-300 hover:text-gray-100 transition-colors"
                                    title="Remove file"
                                >
                                    <HiX className="w-4 h-4" />
                                </button>
                            </div>
                        ) : null }

                        </div>

                        <button
                            onClick={handleSend}
                            className="p-2 rounded-full bg-black hover:bg-gray-800 text-white transition disabled:opacity-50"
                            disabled={isLoading}
                            type="button"
                        >
                            <IoSend size={18}/>
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const navigationItems = [
    {
        path: '/oecora',
        name: 'Home',
        icon: <HiHome className="h-5 w-5" />
    },
    {
        path: '/chat',
        name: 'Chat',
        icon: <HiChatAlt2 className="h-5 w-5" />
    },
    {
        path: '/canvas',
        name: 'Canvas',
        icon: <HiColorSwatch className="h-5 w-5" />
    }
];

// Layout component
const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    return (
        <div className="drawer lg:drawer-open bg-white">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            <div className="drawer-content flex flex-col bg-white">
                <div className="navbar bg-white border-b border-gray-200 lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost text-black hover:bg-gray-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block w-6 h-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-xl font-semibold text-black">Oecora</h1>
                    </div>
                </div>

                <main className="flex-1 p-6 bg-white min-h-screen">
                    <div className="mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <aside className="min-h-full bg-white border-r-2 border-gray-200 text-black">
                    <div className="p-4 border-b border-gray-200 bg-white">
                        <h2 className="text-lg font-semibold text-black text-center">O</h2>
                    </div>
                    
                    <ul className="menu p-2 space-y-2 bg-white border-gray-200 w-16">
                        {navigationItems.map((item) => (
                            <li key={item.path}>
                                <Link 
                                    to={item.path} 
                                    className={`flex items-center justify-center w-12 h-12 rounded-lg ${
                                        location.pathname === item.path 
                                            ? 'bg-black text-white hover:bg-gray-800' 
                                            : 'text-black hover:bg-gray-100'
                                    }`}
                                    title={item.name}
                                >
                                    {item.icon}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </div>
    );
};


function App() {
    return (
        <div className="bg-white min-h-screen">
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/oecora" element={<Home />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/canvas" element={<Canva />} />
                    </Routes>
                </Layout>
            </Router>
        </div>
    );
}

export default App;