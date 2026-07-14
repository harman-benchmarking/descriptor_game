import {
  createListeningTrial,
  type ListeningChallengeDefinition,
  type ListeningOptionLabel,
  type ListeningTrial,
  type ListeningTrialOption
} from "./listeningChallenges";

export type BlindPreviewStartResult = "started" | "failed" | "stale";

export type BlindPreviewAttempt = {
  trialId: string;
  requestId: number;
  optionLabel: ListeningOptionLabel;
};

export type BlindTrialResult = {
  correct: boolean;
  option: ListeningTrialOption;
};

export type BlindTrialSession = {
  id: string;
  trial: ListeningTrial;
  previewedLabels: ListeningOptionLabel[];
  pendingPreview: BlindPreviewAttempt | null;
  previewFailed: boolean;
  result: BlindTrialResult | null;
  nextPreviewRequestId: number;
};

export function createBlindTrialSession(
  definition: ListeningChallengeDefinition,
  id: string,
  random: () => number = Math.random
): BlindTrialSession {
  return {
    id,
    trial: createListeningTrial(definition, random),
    previewedLabels: [],
    pendingPreview: null,
    previewFailed: false,
    result: null,
    nextPreviewRequestId: 1
  };
}

export function beginBlindPreview(
  session: BlindTrialSession,
  optionLabel: ListeningOptionLabel
): { session: BlindTrialSession; attempt: BlindPreviewAttempt } {
  const attempt: BlindPreviewAttempt = {
    trialId: session.id,
    requestId: session.nextPreviewRequestId,
    optionLabel
  };

  return {
    attempt,
    session: {
      ...session,
      pendingPreview: attempt,
      previewFailed: false,
      nextPreviewRequestId: session.nextPreviewRequestId + 1
    }
  };
}

function samePreviewAttempt(left: BlindPreviewAttempt | null, right: BlindPreviewAttempt) {
  return Boolean(
    left &&
      left.trialId === right.trialId &&
      left.requestId === right.requestId &&
      left.optionLabel === right.optionLabel
  );
}

export function settleBlindPreview(
  session: BlindTrialSession,
  attempt: BlindPreviewAttempt,
  outcome: BlindPreviewStartResult
): BlindTrialSession {
  if (session.id !== attempt.trialId || !samePreviewAttempt(session.pendingPreview, attempt)) return session;

  if (outcome === "started") {
    return {
      ...session,
      previewedLabels: session.previewedLabels.includes(attempt.optionLabel)
        ? session.previewedLabels
        : [...session.previewedLabels, attempt.optionLabel],
      pendingPreview: null,
      previewFailed: false
    };
  }

  return {
    ...session,
    pendingPreview: null,
    previewFailed: outcome === "failed"
  };
}

export function canSubmitBlindTrial(session: BlindTrialSession) {
  return session.previewedLabels.length > 0 && session.result === null;
}

export function submitBlindTrialChoice(session: BlindTrialSession, option: ListeningTrialOption): BlindTrialSession {
  if (!canSubmitBlindTrial(session)) return session;
  return {
    ...session,
    result: {
      correct: option.descriptorId === session.trial.targetId,
      option
    }
  };
}

export function blindPreviewAttemptKey(attempt: BlindPreviewAttempt) {
  return `${attempt.trialId}/${attempt.requestId}/${attempt.optionLabel}`;
}
