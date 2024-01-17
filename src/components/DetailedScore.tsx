import {SCORE_COLORS} from "@/components/CircularScore";

type DetailedScoreType = {
    score: {
        transportation_efficiency: number,
        energy_conservation: number,
        sustainable_food_choices: number,
        noise_pollution_reduction: number,
        light_pollution_management: number,
        biodiversity_protection: number
    }
}

type ScoreSectionType = {
    title: string,
    score: number
}

const ScoreSection = ({title, score}: ScoreSectionType) => {
    const percentage = score / 1000 * 100;
    const color = score < 800 ? SCORE_COLORS.red : score < 900 ? SCORE_COLORS.yellow : SCORE_COLORS.green;

    return <div className={`flex w-full gap-2 justify-end items-center`}>
        <p className="text-sm font-bold text-black uppercase text-right">{title}</p>
        <div className="relative w-[250px] h-[10px]">
            <div className="absolute w-full h-full rounded-full" style={{background: SCORE_COLORS.backgroundDark}}/>
            <div className="absolute h-full rounded-full" style={{background: color, width: percentage+'%'}} />
        </div>
    </div>
}

export default function DetailedScore({score}: DetailedScoreType) {
    const {
        transportation_efficiency,
        energy_conservation,
        sustainable_food_choices,
        noise_pollution_reduction,
        light_pollution_management,
        biodiversity_protection
    } = score;

    return (
        <div className="flex flex-col gap-4 w-full p-4">
            {/* Transportation Efficiency */}
            <ScoreSection title="Transport" score={transportation_efficiency}/>
            {/* Energy Conservation */}
            <ScoreSection title="Energie" score={energy_conservation}/>
            {/* Sustainable Food Choices */}
            <ScoreSection title="Alimentation" score={sustainable_food_choices}/>
            {/* Noise Pollution Reduction */}
            <ScoreSection title="Nuisance sonore" score={noise_pollution_reduction}/>
            {/* Light Pollution Management */}
            <ScoreSection title="Pollution lumineuse" score={light_pollution_management}/>
            {/* Biodiversity Protection */}
            <ScoreSection title="Protection de la biodiversité" score={biodiversity_protection}/>
        </div>
    )
}