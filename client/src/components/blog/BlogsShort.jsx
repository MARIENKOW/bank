"use client";

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useCallback, useEffect, useRef, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BlogService from "../../services/BlogService";
import { Subtitile } from "../Subtitle";
import { BlogItemShort } from "./item/BlogItemShort";
import { ContainerComponent } from "../wrappers/ContainerComponent";
import { grey } from "@mui/material/colors";

const blog = new BlogService();

export const BlogsShort = () => {
    const theme = useTheme();
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await blog.getShort();
                setBlogs(data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    const sliderRef = useRef(null);
    const [isEnd, setIsEnd] = useState(
        sliderRef?.current?.swiper?.isBeginning || false
    );
    const [isBeg, setIsBeg] = useState(
        sliderRef?.current?.swiper?.isEnd || false
    );
    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    });

    if (!blogs || blogs?.length === 0) return "";

    return (
        <Box sx={{ bgcolor: theme.palette.primary.dark }}>
            <ContainerComponent>
                <Box p={"0 25px"} position={"relative"}>
                    <Swiper
                        ref={sliderRef}
                        className="swiper-centered"
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={40}
                        slidesPerView={3}
                        // onReachBeginning={()=>{
                        //    setIsBeg(true)
                        // }}
                        onInit={(swiper) => {
                            setIsBeg(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        onSlideChange={(swiper) => {
                            setIsBeg(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        // onReachEnd={()=>{
                        //    setIsEnd(true)
                        // }}
                        autoplay={{
                            delay: 100,
                        }}
                        breakpoints={{
                            240: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            540: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            840: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            940: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                        }}
                    >
                        {blogs.map((item) => (
                            <SwiperSlide
                                style={{ height: "auto" }}
                                key={item?.id}
                            >
                                <BlogItemShort item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <IconButton
                        disabled={isBeg}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "0",
                            transform: "translate(-50%,-50%)",
                            zIndex: 2,
                        }}
                        color="secondary"
                        onClick={handlePrev}
                    >
                        <ArrowBackIosNewIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                        disabled={isEnd}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            right: "0",
                            transform: "translate(50%,-50%)",
                            zIndex: 2,
                        }}
                        color="secondary"
                        onClick={handleNext}
                    >
                        <ArrowForwardIosIcon fontSize="large" />
                    </IconButton>
                </Box>
            </ContainerComponent>
        </Box>
    );
};
