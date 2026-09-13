'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  checklistFormDefaultValues,
  checklistFormSchema,
  type ChecklistFormValues,
} from '@/lib/checklistFormSchema';
import { checklistSteps, type ChecklistStepId } from '@/lib/checklistSteps';

import { StepBlocks } from './steps/StepBlocks';
import { StepGoals } from './steps/StepGoals';
import { StepScope } from './steps/StepScope';
import { ChecklistProgress } from './ChecklistProgress';

/**
 * Nur Schritte 1–3 sind gebaut (Block G2, erster Durchgang) — siehe
 * `checklistSteps.ts`. Schritte 4–7 folgen im nächsten Durchgang, deshalb
 * ist "Weiter" auf dem letzten verfügbaren Schritt bewusst deaktiviert statt
 * ins Leere zu führen (honest stub, wie schon "View certificates" in Block E).
 */
export function ChecklistWizard() {
  const t = useTranslations('Checkliste');
  const [currentStepId, setCurrentStepId] = useState<ChecklistStepId>('goals');

  const {
    register,
    control,
    trigger,
    formState: { errors },
  } = useForm<ChecklistFormValues>({
    resolver: zodResolver(checklistFormSchema),
    defaultValues: checklistFormDefaultValues,
    mode: 'onSubmit',
  });

  const goals = useWatch({ control, name: 'goals' });
  const visibleSteps = checklistSteps.filter((step) => step.isVisible(goals));
  // Fällt auf Schritt 0 ("goals", immer sichtbar) zurück, wenn Website-Ziele
  // abgewählt wurden und `currentStepId` gerade auf scope/blocks zeigt.
  const currentIndex = Math.max(
    visibleSteps.findIndex((step) => step.id === currentStepId),
    0,
  );
  const currentStep = visibleSteps[currentIndex];
  const isLastStep = currentIndex === visibleSteps.length - 1;

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentStepId(visibleSteps[currentIndex - 1].id);
    }
  };

  const goToNext = async () => {
    const isValid = await trigger(currentStep.fields);
    if (!isValid) return;

    if (currentIndex < visibleSteps.length - 1) {
      setCurrentStepId(visibleSteps[currentIndex + 1].id);
    }
  };

  return (
    <Card className="p-6 sm:p-8">
      <ChecklistProgress
        current={currentIndex + 1}
        total={visibleSteps.length}
        label={t('progress', {
          current: currentIndex + 1,
          total: visibleSteps.length,
        })}
      />

      <div className="mt-8">
        {currentStep.id === 'goals' && (
          <StepGoals control={control} errors={errors} />
        )}
        {currentStep.id === 'scope' && <StepScope register={register} />}
        {currentStep.id === 'blocks' && <StepBlocks control={control} />}
      </div>

      <div className="border-border mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="secondary"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t('back')}
        </Button>

        <div className="flex flex-col items-end gap-2">
          <Button type="button" onClick={goToNext} disabled={isLastStep}>
            {t('next')}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
          {isLastStep && (
            <p className="text-fg-muted text-xs">{t('moreStepsSoon')}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
