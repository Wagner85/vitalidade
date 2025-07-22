
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { WeeklyPlan, DailyPlan, Meal } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import LoadingSpinner from './LoadingSpinner';

// --- Icons ---
const DumbbellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-indigo-500"><path d="M14.4 14.4 9.6 9.6M18 7l-1.4-1.4M6 17l-1.4-1.4M21 16l-2-2M3 8l-2-2M12 22a1 1 0 0 0 1-1v-5a1 1 0 0 0-2 0v5a1 1 0 0 0 1 1ZM12 3a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1Z"></path></svg>;
const UtensilsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-orange-500"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z"></path></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-amber-500"><path d="M12 3 9.5 9.5 3 12l6.5 2.5L12 21l2.5-6.5L21 12l-6.5-2.5z"></path><path d="M5 3v4"></path><path d="M19 3v4"></path><path d="M3 19h4"></path><path d="M19 19h4"></path></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-emerald-600"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;

interface PlanDisplayProps {
  plan: WeeklyPlan;
  onBack: () => void;
  userEmail: string;
}

const MealCard: React.FC<{ title: string; meal: Meal }> = ({ title, meal }) => (
    <div>
        <h4 className="font-semibold text-slate-700">{title}</h4>
        <p className="text-slate-600">{meal.option}</p>
        <p className="text-xs text-slate-500 mt-1"><em>Benefícios: {meal.benefits}</em></p>
    </div>
);

const DailyPlanView: React.FC<{ day: DailyPlan }> = ({ day }) => (
    <div className="space-y-8">
        {/* Exercises */}
        <Card className="border border-indigo-100">
            <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-indigo-100 p-2 rounded-full"><DumbbellIcon /></div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Plano de Exercícios</h3>
                        <p className="font-semibold text-indigo-600">{day.exerciseFocus}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {day.exercises.map((ex, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-lg">
                            <h4 className="font-semibold text-slate-700">{ex.name}</h4>
                            <p className="text-slate-600">{ex.description}</p>
                        </div>
                    ))}
                </div>
                {day.exerciseNotes && day.exerciseNotes.length > 0 && (
                     <div className="mt-4 p-3 bg-indigo-50 text-indigo-800 rounded-lg text-sm">
                        <p className="font-semibold mb-1">Observações Importantes:</p>
                        <ul className="list-disc list-inside space-y-1">
                            {day.exerciseNotes.map((note, i) => <li key={i}>{note}</li>)}
                        </ul>
                    </div>
                )}
            </div>
        </Card>
        
        {/* Meals */}
        <Card className="border border-orange-100">
            <div className="p-6">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="bg-orange-100 p-2 rounded-full"><UtensilsIcon /></div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Plano Nutricional</h3>
                        <p className="font-semibold text-orange-600">{day.mealFocus}</p>
                    </div>
                </div>
                <div className="space-y-4 grid md:grid-cols-2 gap-x-6 gap-y-4">
                    <MealCard title="Café da Manhã" meal={day.breakfast} />
                    <MealCard title="Lanche da Manhã" meal={day.morningSnack} />
                    <MealCard title="Almoço" meal={day.lunch} />
                    <MealCard title="Lanche da Tarde" meal={day.afternoonSnack} />
                    <MealCard title="Jantar" meal={day.dinner} />
                </div>
                 {day.mealNotes && day.mealNotes.length > 0 && (
                     <div className="mt-4 p-3 bg-orange-50 text-orange-800 rounded-lg text-sm">
                        <p className="font-semibold mb-1">Dicas Nutricionais:</p>
                        <ul className="list-disc list-inside space-y-1">
                           {day.mealNotes.map((note, i) => <li key={i}>{note}</li>)}
                        </ul>
                    </div>
                )}
            </div>
        </Card>
        
        {/* Reminders & Vida Vitoriosa */}
        <div className="grid md:grid-cols-2 gap-6">
            <Card className="border border-amber-100">
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="bg-amber-100 p-2 rounded-full"><SparklesIcon /></div>
                       <h3 className="text-lg font-bold text-slate-800">Lembretes de Vitalidade</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-600">
                        <li><strong>Hidratação:</strong> {day.vitalityReminders.hydration}</li>
                        <li><strong>Movimento:</strong> {day.vitalityReminders.movement}</li>
                        <li><strong>Suplementos:</strong> {day.vitalityReminders.supplements}</li>
                        <li><strong>Bem-estar Mental:</strong> {day.vitalityReminders.mentalWellbeing}</li>
                        <li><strong>Acompanhamento:</strong> {day.vitalityReminders.professionalFollowUp}</li>
                    </ul>
                </div>
            </Card>
            <Card className="border border-emerald-100 bg-emerald-50/50">
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="bg-emerald-100 p-2 rounded-full"><BookOpenIcon /></div>
                       <h3 className="text-lg font-bold text-slate-800">Vida Vitoriosa</h3>
                    </div>
                    <blockquote className="border-l-4 border-emerald-400 pl-4">
                        <p className="italic text-slate-700">"{day.vidaVitoriosa.verse}"</p>
                        <p className="mt-2 text-sm text-slate-600">{day.vidaVitoriosa.motivation}</p>
                    </blockquote>
                </div>
            </Card>
        </div>
    </div>
);


const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, onBack, userEmail }) => {
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    const handleDownloadPdf = () => {
        setIsGeneratingPdf(true);

        const doc = new jsPDF('p', 'mm', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 10;
        const contentWidth = pageWidth - margin * 2;
        const footerStartY = pageHeight - 25;
        let yPos = 0;

        // Colors inspired by TailwindCSS palette
        const colors = {
            slate: { 800: '#1e293b', 700: '#334155', 600: '#475569' },
            indigo: { 600: '#4f46e5', 100: '#e0e7ff', 50: '#eef2ff' },
            orange: { 600: '#f97316', 100: '#ffedd5', 50: '#fff7ed' },
            emerald: { 800: '#065f46', 600: '#059669', 100: '#d1fae5', 50: '#f0fdf4' },
            amber: { 600: '#f59e0b', 100: '#fef3c7', 50: '#fffbeb' },
        };

        const addHeader = (email: string, day: string) => {
            doc.setTextColor(colors.slate[800]);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('Vitalidade Dourada AI', pageWidth / 2, margin + 5, { align: 'center' });
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(colors.slate[600]);
            doc.text('web.aimentory.com.br', pageWidth / 2, margin + 11, { align: 'center' });
            doc.text(`Plano para: ${email}`, pageWidth / 2, margin + 17, { align: 'center' });

            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(colors.emerald[800]);
            doc.text(day, margin, margin + 30);
            yPos = margin + 35;
        };


        const drawCard = (title: string, focus: string, items: { name: string; description: string }[], notes: string[] | undefined, titleColor: string, notesBgColor: string) => {
            const cardStartY = yPos;
            doc.setFont('helvetica', 'normal');
            
            // Section Title
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(titleColor);
            doc.text(title, margin + 5, yPos + 5);
            
            // Section Focus
            if (focus) {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'italic');
                doc.setTextColor(colors.slate[600]);
                const focusLines = doc.splitTextToSize(focus, contentWidth - 10);
                doc.text(focusLines, margin + 5, yPos + 11);
                yPos += 6 + (focusLines.length * 4);
            } else {
                yPos += 5;
            }

            // Items
            items.forEach(item => {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(colors.slate[700]);
                const nameLines = doc.splitTextToSize(item.name, contentWidth - 10);
                doc.text(nameLines, margin + 5, yPos + 5);
                yPos += (nameLines.length * 4);

                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(colors.slate[600]);
                const descLines = doc.splitTextToSize(item.description, contentWidth - 10);
                doc.text(descLines, margin + 5, yPos + 4);
                yPos += (descLines.length * 3.5) + 6;
            });

            // Notes
            if (notes && notes.length > 0) {
                const notesStartY = yPos;
                const notesText = notes.map(n => `- ${n}`).join('\n');
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(colors.slate[700]);
                const notesLines = doc.splitTextToSize(notesText, contentWidth - 18);
                doc.text(notesLines, margin + 9, yPos + 9);
                const notesHeight = (notesLines.length * 3.5) + 12;
                
                doc.setFillColor(notesBgColor);
                doc.rect(margin + 5, notesStartY + 2, contentWidth - 10, notesHeight, 'F');
                doc.text(notesLines, margin + 9, yPos + 9);
                yPos += notesHeight + 5;
            }

            // Draw card background
            doc.setFillColor('#ffffff');
            doc.setDrawColor(colors.slate[600]);
            doc.setLineWidth(0.1);
            doc.rect(margin, cardStartY, contentWidth, yPos - cardStartY, 'S'); // Stroke
            yPos += 8; // Space between cards
        };

        plan.plan.forEach((day, index) => {
            if (index > 0) doc.addPage();
            addHeader(userEmail, day.dayOfWeek);

            drawCard(
                "Plano de Exercícios",
                day.exerciseFocus,
                day.exercises,
                day.exerciseNotes,
                colors.indigo[600],
                colors.indigo[50]
            );

            const meals = [
                { name: "Café da Manhã", description: `${day.breakfast.option} (Benefícios: ${day.breakfast.benefits})` },
                { name: "Lanche da Manhã", description: `${day.morningSnack.option} (Benefícios: ${day.morningSnack.benefits})` },
                { name: "Almoço", description: `${day.lunch.option} (Benefícios: ${day.lunch.benefits})` },
                { name: "Lanche da Tarde", description: `${day.afternoonSnack.option} (Benefícios: ${day.afternoonSnack.benefits})` },
                { name: "Jantar", description: `${day.dinner.option} (Benefícios: ${day.dinner.benefits})` },
            ];
            drawCard(
                "Plano Nutricional",
                day.mealFocus,
                meals,
                day.mealNotes,
                colors.orange[600],
                colors.orange[50]
            );

            // Reminders and Vida Vitoriosa are smaller and can be drawn differently
            const reminders = Object.entries(day.vitalityReminders).map(([key, value]) => ({
                name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
                description: value
            }));
            drawCard(
                "Lembretes de Vitalidade",
                "",
                reminders,
                undefined,
                colors.amber[600] || '#f59e0b', // Fallback color
                colors.amber[50] || '#fffbeb'
            );

            const vidaVitoriosaItems = [
                { name: `"${day.vidaVitoriosa.verse}"`, description: day.vidaVitoriosa.motivation }
            ];
            drawCard(
                "Vida Vitoriosa",
                "",
                vidaVitoriosaItems,
                undefined,
                colors.emerald[600],
                colors.emerald[50]
            );
        });

        // Add a final page exclusively for feedback and the notice
        doc.addPage();
        
        let finalPageYPos = margin + 20;

        // Feedback Section
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(colors.slate[800]);
        doc.text('Sua opinião é importante!', pageWidth / 2, finalPageYPos, { align: 'center' });
        finalPageYPos += 8;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(colors.slate[600]);
        const feedbackIntro = 'Gostaríamos de ouvir sua opinião para continuar melhorando a plataforma.';
        doc.text(feedbackIntro, pageWidth / 2, finalPageYPos, { align: 'center' });
        finalPageYPos += 10;

        const linkText = 'Envie sua sugestão';
        const linkUrl = 'https://automation.aimentory.com.br/form/c6ab06e4-a8d9-4f1a-b5e6-beea1a9cb946';
        const linkTextWidth = doc.getTextWidth(linkText);
        const linkX = (pageWidth - linkTextWidth) / 2;
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(colors.indigo[600]); // Blue color for link
        doc.textWithLink(linkText, linkX, finalPageYPos, { url: linkUrl });
        
        // Divider
        finalPageYPos += 20;
        doc.setDrawColor(colors.slate[600]);
        doc.line(margin, finalPageYPos, pageWidth - margin, finalPageYPos);
        finalPageYPos += 15;

        // Notice Section
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(colors.slate[800]);
        doc.text('Aviso Importante', pageWidth / 2, finalPageYPos, { align: 'center' });
        
        // Reposition footer to the bottom of the available space
        const finalFooterStartY = finalPageYPos + 10;
        const footerText = "AVISO IMPORTANTE: Vitalidade Dourada AI é uma ferramenta de apoio e incentivo. As informações e planos gerados não substituem, em nenhuma hipótese, a consulta e o acompanhamento de médicos, nutricionistas, fisioterapeutas e outros profissionais de saúde. Sempre consulte um profissional antes de iniciar qualquer novo programa de exercícios ou dieta.";
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(colors.slate[600]);
        doc.text(footerText, margin, finalFooterStartY, { maxWidth: contentWidth, align: 'justify' });


        doc.save('plano_vitalidade_semanal.pdf');
        setIsGeneratingPdf(false);
    };

    if (!plan || !plan.plan || plan.plan.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500">Ocorreu um erro ao carregar o plano.</p>
                <Button onClick={onBack} variant="secondary" className="mt-4">
                    Voltar e Tentar Novamente
                </Button>
            </div>
        );
    }
    
    const selectedDay = plan.plan[selectedDayIndex];

    return (
        <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="text-center mb-8">
                 <h2 className="text-3xl font-extrabold text-emerald-800 tracking-tight">Seu Plano de Vitalidade Personalizado</h2>
                 <p className="mt-4 text-slate-600 max-w-3xl mx-auto">{plan.introduction}</p>
            </div>

            {/* Day Selector */}
            <div className="mb-8 overflow-x-auto pb-2">
                <div className="flex justify-center items-center space-x-2 border-b border-slate-200" role="tablist" aria-label="Seleção do dia da semana">
                    {plan.plan.map((day, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedDayIndex(index)}
                            role="tab"
                            aria-selected={selectedDayIndex === index}
                            id={`day-tab-${index}`}
                            aria-controls={`day-panel-${index}`}
                            className={`px-4 py-3 font-semibold whitespace-nowrap text-sm focus:outline-none transition-colors duration-200 ${
                                selectedDayIndex === index 
                                ? 'border-b-2 border-emerald-600 text-emerald-600'
                                : 'text-slate-500 hover:text-emerald-500 hover:bg-slate-100 rounded-t-md'
                            }`}
                        >
                            {day.dayOfWeek}
                        </button>
                    ))}
                </div>
            </div>

            {/* Daily Plan View */}
            <div role="tabpanel" id={`day-panel-${selectedDayIndex}`} aria-labelledby={`day-tab-${selectedDayIndex}`}>
              {selectedDay && <DailyPlanView day={selectedDay} />}
            </div>

            {/* Action Buttons */}
            <div className="mt-12 text-center space-y-4 md:space-y-0 md:space-x-4">
                 <Button onClick={onBack} variant="secondary" disabled={isGeneratingPdf}>
                   Gerar um Novo Plano
                 </Button>
                 <Button onClick={handleDownloadPdf} variant="primary" disabled={isGeneratingPdf}>
                    {isGeneratingPdf ? <LoadingSpinner /> : 'Baixar Plano Semanal em PDF'}
                 </Button>
            </div>
        </div>
    );
};

export default PlanDisplay;
