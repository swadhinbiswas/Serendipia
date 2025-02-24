import React from "react";
import MorphingText from "./magicui/morphingtext";

const text = [
    "Serendipia",
    "is",
    "Coming Soon",
    "Please", "BE", "Patient"
];

export function Morph() {
    return (
        <div style={{ color: "white" }}>
            <MorphingText texts={text} />
        </div>
    );
}