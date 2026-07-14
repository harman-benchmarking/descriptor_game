import { describe, expect, it } from "vitest";
import { descriptorById } from "../cards/descriptorCatalog";
import { gateDefinitions } from "../data/regions";
import { createListeningTrial, listeningChallengeFor } from "../learn/listeningChallenges";

describe("listening challenges", () => {
  it("defines blind challenges for bass gate catch cards", () => {
    expect(listeningChallengeFor("bass", "thump")?.confuserIds).toEqual(["thin", "warm"]);
    expect(listeningChallengeFor("bass", "rumble")?.confuserIds).toEqual(["thin", "boxy"]);
    expect(listeningChallengeFor("bass", "punchy")?.confuserIds).toEqual(["thin", "warm"]);
    expect(listeningChallengeFor("bass", "muddy")?.confuserIds).toEqual(["thin", "honky"]);
  });

  it("includes the gate cut anchor in every spectral blind challenge", () => {
    const cutAnchorByGate = {
      bass: "thin",
      mid: "hollow",
      treble: "dull"
    } as const;

    for (const gate of gateDefinitions.filter((definition) => definition.moduleId === "spectral")) {
      const cutAnchor = cutAnchorByGate[gate.id as keyof typeof cutAnchorByGate];
      for (const targetId of [gate.firstCatch, ...gate.laterUnlocks]) {
        const definition = listeningChallengeFor(gate.id, targetId);
        expect([targetId, ...(definition?.confuserIds ?? [])], `${gate.id}.${targetId}`).toContain(cutAnchor);
      }
    }
  });

  it("defines blind challenges for every training gate unlock card", () => {
    for (const gate of gateDefinitions) {
      for (const targetId of [gate.firstCatch, ...gate.laterUnlocks]) {
        const definition = listeningChallengeFor(gate.id, targetId);
        expect(definition, `${gate.id}.${targetId}`).toBeDefined();
        expect(definition?.confuserIds, `${gate.id}.${targetId}`).toHaveLength(2);
        expect(definition?.confuserIds, `${gate.id}.${targetId}`).not.toContain(targetId);
        expect(new Set(definition?.confuserIds).size, `${gate.id}.${targetId}`).toBe(2);

        for (const descriptorId of [targetId, ...(definition?.confuserIds ?? [])]) {
          expect(descriptorById.has(descriptorId), `${gate.id}.${targetId}.${descriptorId}`).toBe(true);
        }
      }
    }
  });

  it("creates unlabeled A/B/C options containing one target and two confusers", () => {
    const definition = listeningChallengeFor("bass", "thump");
    expect(definition).toBeDefined();

    const trial = createListeningTrial(definition!, () => 0.99);
    expect(trial.targetId).toBe("thump");
    expect(trial.options.map((option) => option.label)).toEqual(["A", "B", "C"]);
    expect(new Set(trial.options.map((option) => option.descriptorId))).toEqual(new Set(["thump", "thin", "warm"]));
  });
});
