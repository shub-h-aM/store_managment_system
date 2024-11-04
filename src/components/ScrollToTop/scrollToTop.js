import { useCallback, useEffect, useState } from "react";
import { SvgIcon } from "./SvgIcon";
import { ScrollUpContainer } from "./styles";

const ScrollToTop = () => {
    const [showScroll, setShowScroll] = useState(false);

    // Use useCallback to prevent unnecessary re-renders
    const checkScrollTop = useCallback(() => {
        const offsetFromTop = window.scrollY;
        setShowScroll(offsetFromTop > 350);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", checkScrollTop);
        return () => window.removeEventListener("scroll", checkScrollTop);
    }, [checkScrollTop]);

    const scrollUp = () => {
        const element = document.getElementById("intro");
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        }
    };

    return (
        showScroll && (
            <ScrollUpContainer onClick={scrollUp}>
                <SvgIcon src="scroll-top.svg" width="20px" height="20px" />
            </ScrollUpContainer>
        )
    );
};

export default ScrollToTop;
