"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";

// Icons
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaDatabase,
  FaTiktok,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  MdOutlineHealthAndSafety,
  MdOutlineSchool,
  MdFactory,
  MdOutlineAttachMoney,
  MdOutlineBolt,
  MdOutlineGrass,
  MdOutlineLocalShipping,
  MdOutlineMovie,
  MdOutlineShoppingCart,
  MdOutlineAccountBalance,
  MdOutlineFactory,
} from "react-icons/md";
import {
  BiMobileAlt,
  BiCodeAlt,
  BiCog,
  BiDesktop,
  BiSolidMagicWand,
} from "react-icons/bi";

import { SparklesCore } from "@/components/ui/sparkles";
import { WavyBackground } from "@/components/ui/wavy-background";
import { motion } from "framer-motion";
import { Silkscreen } from "next/font/google";
import { FlipWords } from "@/components/ui/flip-words";

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [industry, setIndustry] = useState("");
  const [projectType, setProjectType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [projectIdea, setProjectIdea] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const words = ["distinctive ", "original", "exclusive", "rare"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const generateProjectIdea = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/generate-capstone", {
        industry,
        projectType,
        difficulty,
      });

      let cleanedResponse = response.data.projectIdea.replace(
        /```json|```/g,
        ""
      ); // Remove code block markers
      setProjectIdea(cleanedResponse);
    } catch (error) {
      console.error("Error generating project idea:", error);
      setProjectIdea(null);
    } finally {
      setLoading(false);
    }
  };

  if (showSplash) {
    return (
      <WavyBackground>
          <div className="flex items-center justify-center min-h-screen text-white">
            <div className="text-center flex flex-col items-center justify-center gap-3">
              <h1
                className={`text-4xl mb-2 loading loading-title ${silkscreen.className}`}
                style={{ textShadow: "1px 1px 2px black" }}
              >
                Welcome to the Capstone Project Idea Generator!
              </h1>
              <div
                className="text-zinc-300 text-md mb-5"
                style={{ textShadow: "1px 1px 2px black" }}
              >
                Your one-stop destination to spark creativity and discover
                innovative ideas for your next capstone project. Let's bring
                your vision to life! 🚀
              </div>
              <div className="spinner bg-white">
                <div className="spinnerin"></div>
              </div>
              <p
                className={`mt-2 text-zinc-300 ${silkscreen.className}`}
                style={{ textShadow: "1px 1px 2px black" }}
              >
                Loading...
              </p>
            </div>
          </div>
      </WavyBackground>
    );
  }

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 2.0,
          ease: "easeInOut",
        }}
      >
        <SparklesCore
          className="absolute inset-0 -z-10"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={20}
          particleColor="#FFFFFF"
        />

        <div className="flex-1 flex-col justify-center items-center min-h-screen py-5">
          {/* Header Section */}
          <header className="text-center py-6 text-gray-800">
            <h1
              className={`text-5xl md:text-4xl font-bold text-white ${silkscreen.className}`}
            >
              Capstone Idea Generator
            </h1>
            <div className="mt-2 text-base md:text-lg text-zinc-300">
              Generate <FlipWords className="text-zinc-300" words={words} />
              and detailed project ideas tailored for your capstone!
            </div>
          </header>

          <div className="flex flex-col lg:flex-row mx-auto px-4 space-y-8 lg:space-y-0 lg:space-x-8 lg:px-20 w-full">
            {/* Filter Panel */}
            <div className="w-full lg:w-full space-y-6">
              <Card className="p-6 shadow-lg bg-zinc-900 rounded-lg">
                <CardHeader>
                  <CardTitle className="text-white">Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="industry" className="text-white">
                        Industry
                      </Label>
                      <Select onValueChange={setIndustry}>
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select Industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Healthcare">
                            <MdOutlineHealthAndSafety className="inline-block mr-2 text-black" />{" "}
                            Healthcare
                          </SelectItem>
                          <SelectItem value="Education">
                            <MdOutlineSchool className="inline-block mr-2 text-black" />{" "}
                            Education
                          </SelectItem>
                          <SelectItem value="Agriculture">
                            <MdOutlineGrass className="inline-block mr-2 text-black" />{" "}
                            Agriculture
                          </SelectItem>
                          <SelectItem value="Finance">
                            <MdOutlineAttachMoney className="inline-block mr-2 text-black" />{" "}
                            Finance
                          </SelectItem>
                          <SelectItem value="Retail">
                            <MdOutlineShoppingCart className="inline-block mr-2 text-black" />{" "}
                            Retail
                          </SelectItem>
                          <SelectItem value="Manufacturing">
                            <MdOutlineFactory className="inline-block mr-2 text-black" />{" "}
                            Manufacturing
                          </SelectItem>
                          <SelectItem value="Transportation">
                            <MdOutlineLocalShipping className="inline-block mr-2 text-black" />{" "}
                            Transportation
                          </SelectItem>
                          <SelectItem value="Energy">
                            <MdOutlineBolt className="inline-block mr-2 text-black" />{" "}
                            Energy
                          </SelectItem>
                          <SelectItem value="Entertainment">
                            <MdOutlineMovie className="inline-block mr-2 text-black" />{" "}
                            Entertainment
                          </SelectItem>
                          <SelectItem value="Government">
                            <MdOutlineAccountBalance className="inline-block mr-2 text-black" />{" "}
                            Government
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="projectType" className="text-white">
                        Project Type
                      </Label>
                      <Select onValueChange={setProjectType}>
                        <SelectTrigger id="projectType">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mobile App">
                            <BiMobileAlt className="inline-block mr-2 text-black" />
                            Mobile App
                          </SelectItem>
                          <SelectItem value="Web App">
                            <BiCodeAlt className="inline-block mr-2 text-black" />
                            Web App
                          </SelectItem>
                          <SelectItem value="Desktop App">
                            <BiDesktop className="inline-block mr-2 text-black" />
                            Desktop App
                          </SelectItem>
                          <SelectItem value="AI App">
                            <FaDatabase className="inline-block mr-2 text-black" />
                            AI App
                          </SelectItem>
                          <SelectItem value="IoT App">
                            <BiCog className="inline-block mr-2 text-black" />
                            IoT App
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="difficulty" className="text-white">
                        Difficulty
                      </Label>
                      <Select onValueChange={setDifficulty}>
                        <SelectTrigger id="difficulty">
                          <SelectValue placeholder="Select Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      onClick={generateProjectIdea}
                      disabled={loading}
                      className="w-full flex items-center justify-center space-x-2 font-extrabold bg-green-700 text-white hover:text-white hover:bg-green-600"
                    >
                      <span>Generate</span>
                      {loading ? (
                        <Spinner />
                      ) : (
                        <BiSolidMagicWand className="text-xl animate-rocket" />
                      )}
                    </Button>
                  </div>
                  <p className="hidden lg:inline-flex italic text-slate-300 mt-4 text-sm gap-2">
                    <span className="font-bold">Note:</span>The API is limited
                    to control costs. For concerns, email me at{" "}
                    <span className="font-bold"> beastnectus@gmail.com</span>
                  </p>
                </CardContent>
              </Card>

              {/* Social Links */}
              <div className="w-full justify-center gap-3 hidden lg:inline-flex">
                <a href="https://github.com/BeastNectus" target="_blank">
                  <FaGithub className="text-5xl text-white hover:text-gray-500" />
                </a>
                <a
                  href="https://www.linkedin.com/in/john-mamanao-762218278"
                  target="_blank"
                >
                  <FaLinkedin className="text-5xl text-white hover:text-gray-500" />
                </a>
                <a href="https://www.facebook.com/Venectus" target="_blank">
                  <FaFacebook className="text-5xl text-white hover:text-gray-500" />
                </a>
                <a href="https://www.tiktok.com/@a_x_ios" target="_blank">
                  <FaTiktok className="text-5xl text-white hover:text-gray-500" />
                </a>
              </div>
              <div className="button-container hidden lg:flex w-full">
                <button className="brutalist-button openai button-1">
                  <div className="openai-logo">
                    <svg
                      className="openai-icon"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5907 8.3829 14.6108 7.2144a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.3927-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
                        fill="#10A37F"
                      ></path>
                    </svg>
                  </div>
                  <div className="button-text">
                    <span>Powered By</span>
                    <span>GPT 3.5 Turbo</span>
                  </div>
                </button>
              </div>
              <div className="text-center hidden lg:block text-white">
                <p>
                  Developed by:{" "}
                  <span className="font-extrabold ">John Mamanao</span>
                </p>
              </div>
            </div>
            {/* Result Panel */}
            <div className="w-full lg:w-full flex flex-col justify-center items-center p-6 bg-zinc-800 rounded-lg shadow-lg">
              {loading ? (
                <div className="flex justify-center">
                  <Spinner color="white" />
                </div>
              ) : projectIdea ? (
                (() => {
                  let idea;
                  try {
                    idea = JSON.parse(projectIdea); // Safe parsing
                  } catch (error) {
                    console.error("Error parsing project idea:", error);
                    idea = null;
                  }

                  if (!idea) {
                    return (
                      <p className="text-lg text-red-500 text-center">
                        Failed to parse project idea. Please try again.
                      </p>
                    );
                  }

                  return (
                    <Card className="w-full h-full space-y-6 bg-zinc-800">
                      <CardHeader>
                        <CardTitle className="text-white text-xl md:text-3xl font-bold text-center">
                          🚀 {idea.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-300">{idea.description}</p>
                        <div>
                          <h3 className="font-semibold text-white">
                            Languages:
                          </h3>
                          <div className="flex gap-2 flex-wrap">
                            {idea.languages.map((lang: string) => (
                              <span
                                key={lang}
                                className="bg-blue-100 px-2 rounded"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            Team Roles:
                          </h3>
                          <div className="flex gap-2 flex-wrap">
                            {idea.teamRoles.map((role: string) => (
                              <span
                                key={role}
                                className="bg-green-300 px-2 rounded"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            Similar Projects:
                          </h3>
                          <div className="flex flex-col justify-between flex-wrap">
                            {idea.similarProjects.map((project: any) => (
                              <span key={project.name}>
                                <a
                                  href={project.link}
                                  target="_blank"
                                  className="inline-flex items-center gap-2 underline text-white hover:text-blue-800"
                                >
                                  <FaExternalLinkAlt className="text-sm lg:text-xl" />
                                  {project.name}
                                </a>
                              </span>
                            ))}
                          </div>
                        </div>
                        <h3 className="font-semibold text-white">
                          Overall Timeline:{" "}
                          <span className="text-red-600">{idea.timeline}</span>
                        </h3>
                      </CardContent>
                    </Card>
                  );
                })()
              ) : (
                <p className="text-center text-gray-500">
                  Select filters and click Generate to see your project idea.
                </p>
              )}
            </div>
            <p className="sm:block lg:hidden italic text-slate-300 mt-1 text-sm">
              <span className="font-bold">Note:</span>The API is limited to
              control costs. For concerns, email me at{" "}
              <span className="font-bold">beastnectus@gmail.com</span>
            </p>
          </div>
        </div>
        <footer className="sm:block lg:hidden mt-auto py-4 bg-zinc-950 text-white text-center w-full">
          <div className="flex justify-center gap-3 mb-2">
            <a href="https://github.com/BeastNectus" target="_blank">
              <FaGithub className="text-2xl hover:text-gray-500" />
            </a>
            <a
              href="https://www.linkedin.com/in/john-mamanao-762218278"
              target="_blank"
            >
              <FaLinkedin className="text-2xl hover:text-gray-500" />
            </a>
            <a href="https://www.facebook.com/Venectus" target="_blank">
              <FaFacebook className="text-2xl hover:text-gray-500" />
            </a>
            <a href="https://www.tiktok.com/@a_x_ios" target="_blank">
              <FaTiktok className="text-2xl hover:text-gray-500" />
            </a>
          </div>
          <p>
            Developed by: <span className="font-extrabold">John Mamanao</span>
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
