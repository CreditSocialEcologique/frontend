type CicularScoreType = {
    score: number
}

export enum SCORE_COLORS {
    red = "#FF6862",
    yellow = "#F3D879",
    green = "#72AB69",
    background = "#F4F4F4",
    backgroundDark = "#8F8F8F"
}

export default function CicularScore({score}: CicularScoreType) {
    const percentage = score / 1000 * 100;
    const strokeWidth = 5;
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const progress = circumference - (percentage / 100) * circumference;

    const color = score < 800 ? SCORE_COLORS.red : score < 900 ? SCORE_COLORS.yellow : SCORE_COLORS.green;

    return (
        <div className="relative w-full h-full">
            <svg className="absolute" width="100%" height="100%" viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke={SCORE_COLORS.background}
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={progress}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex flex-col justify-center items-center">
                <span className="text-6xl font-bold text-black">{score}</span>
                <span className="text-lg font-bold text-light uppercase">points</span>
            </div>
        </div>
    );

}