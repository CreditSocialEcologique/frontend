import {SCORE_COLORS} from "@/components/CircularScore";

type DetailedScoreType = {
    version: "mobile" | "desktop",
    score: {
        scoreTransport: number,
        scoreAlimentation: number,
        scoreEnergie: number,
        biodiversityProtectionScore: number,
        nuisanceSonore: number,
        pollutionLumineuse: number
    }
}

type ScoreSectionType = {
    title: string,
    score: number
    version: "mobile" | "desktop"
}

const ScoreSection = ({title, score, version}: ScoreSectionType) => {
    const percentage = score / 1000 * 100;
    const color = score < 800 ? SCORE_COLORS.red : score < 900 ? SCORE_COLORS.yellow : SCORE_COLORS.green;

    return <div className={`flex w-full gap-2 justify-end items-center ${version === "mobile" && "flex-col mb-6"}`}>
        <p className={`text-sm font-bold text-black uppercase ${version === "mobile" ? "text-left w-full" : "text-right"}`}>{title}</p>
        <div className={`relative ${version === "mobile" ? "w-full" : "w-[250px]"} h-[10px]`}>
            <div className="absolute w-full h-full rounded-full" style={{background: SCORE_COLORS.backgroundDark}}/>
            <div className="absolute h-full rounded-full" style={{background: color, width: percentage + '%'}}/>
        </div>
    </div>
}

export default function DetailedScore({score, version = "desktop"}: DetailedScoreType) {
    const {
        scoreTransport,
        scoreAlimentation,
        scoreEnergie,
        biodiversityProtectionScore,
        nuisanceSonore,
        pollutionLumineuse
    } = score;

    return (
        <div className="flex flex-col gap-4 w-full p-4">
            {/* Transportation Efficiency */}
            <ScoreSection title="Transport" score={scoreTransport} version={version}/>
            {/* Energy Conservation */}
            <ScoreSection title="Energie" score={scoreEnergie} version={version}/>
            {/* Sustainable Food Choices */}
            <ScoreSection title="Alimentation" score={scoreAlimentation} version={version}/>
            {/* Noise Pollution Reduction */}
            <ScoreSection title="Nuisance sonore" score={nuisanceSonore} version={version}/>
            {/* Light Pollution Management */}
            <ScoreSection title="Pollution lumineuse" score={pollutionLumineuse} version={version}/>
            {/* Biodiversity Protection */}
            <ScoreSection title="Protection de la biodiversité" score={biodiversityProtectionScore} version={version}/>
        </div>
    )
}