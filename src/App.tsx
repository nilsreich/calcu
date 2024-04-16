"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
  MathfieldElement,
  convertAsciiMathToLatex,
  convertLatexToAsciiMath,
} from "mathlive";

import { evaluate } from "mathjs";
import katex from "katex";
import "katex/dist/katex.css";

console.log(convertAsciiMathToLatex("x^2 + y^2 = 1"));

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": React.DetailedHTMLProps<
        React.HTMLAttributes<MathfieldElement>,
        MathfieldElement
      >;
    }
  }
}

export default function Home() {
  const [Input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    if (mf.current) {
      (mf.current as MathfieldElement).mathVirtualKeyboardPolicy = "manual";
      (mf.current as MathfieldElement).menuItems = [];
    }
  }, []);

  const handleButtonClick = (value: string) => {
    (mf.current as unknown as MathfieldElement).executeCommand([
      "insert",
      value,
      { focus: true, selectionMode: "placeholder" },
    ]);
  };

  const mf = useRef<MathfieldElement | null>(null);

  const handleResult = () => {
    if (mf.current) {
      console.log(
          (mf.current as MathfieldElement).getValue() || ""
      );
      setResult(
        convertAsciiMathToLatex(
          evaluate(
            convertLatexToAsciiMath(
              (mf.current as MathfieldElement).getValue() || ""
            )
          ).toString()
        )
      );
      mf.current.focus();
    }
  };

  const handleReset = () => {
    setInput(() => "");
    setResult(() => "");
    mf.current?.executeCommand(["deleteAll"]);
  };

  return (
    <main className="flex flex-col h-svh bg-neutral-300">
      <div className="grow flex flex-col  p-4 bg-green-100 ">
        <div className="grow">{""}</div>
        <div className="text-5xl p-2 overflow-scroll flex justify-end">
          <math-field
            onContextMenu={(event: React.MouseEvent) => event.preventDefault()}
            style={{ all: "unset", width: "100vw", paddingTop: "1rem" }}
            ref={mf}
          >
            {`\\mathsf {${Input}} }`}
          </math-field>
        </div>
        <div
          className="text-3xl p-2 flex justify-end w-full"
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(`\\mathsf{${result}}`),
          }}
        />
      </div>
      <div className="">
        <div className="grid grid-cols-6 text-neutral-100 bg-neutral-800 ">
          <Button size={"lg"} variant={"ghost"} className="rounded-none">
            shift
          </Button>
          <Button size={"lg"} variant={"ghost"} className="rounded-none">
            alpha
          </Button>
          <div className="col-span-2 row-span-3 self-center grid grid-cols-3 grid-rows-3 bg-gray-600 rounded-2xl">
            <Button
              variant={"ghost"}
              className="col-start-2"
              onClick={() => {
                if (mf.current) {
                  mf.current.executeCommand(["moveUp"]);
                  mf.current.focus();
                }
              }}
            >
              <ArrowUpIcon />
            </Button>
            <Button
              variant={"ghost"}
              className="row-start-2 "
              onClick={() => {
                if (mf.current) {
                  mf.current.executeCommand(["moveToPreviousChar"]);
                  mf.current.focus();
                }
              }}
            >
              <ArrowLeftIcon />
            </Button>
            <Button
              variant={"ghost"}
              className=" row-start-2 col-start-3"
              onClick={() => {
                if (mf.current) {
                  mf.current.executeCommand(["moveToNextChar"]);
                  mf.current.focus();
                }
              }}
            >
              <ArrowRightIcon />
            </Button>
            <Button
              variant={"ghost"}
              className="row-start-3 col-start-2 "
              onClick={() => {
                if (mf.current) {
                  mf.current.executeCommand(["moveDown"]);
                  mf.current.focus();
                }
              }}
            >
              <ArrowDownIcon />
            </Button>
          </div>
          <Button size={"lg"} variant={"ghost"} className=" rounded-none">
            menu
          </Button>
          <Button size={"lg"} variant={"ghost"} className=" rounded-none">
            on
          </Button>
          <Button size={"lg"} variant={"ghost"}>
            optn
          </Button>
          <Button size={"lg"} variant={"ghost"}>
            calc
          </Button>

          <Button size={"lg"} variant={"ghost"}>
            int
          </Button>
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={() => handleButtonClick(`x`)}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(`\\mathsf{x}`),
            }}
          />

          <Button size={"lg"} variant={"ghost"}>
            frac
          </Button>
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={() => {
              if (mf.current) {
                (mf.current as unknown as MathfieldElement).executeCommand([
                  "insert",
                  "\\mathsf{\\sqrt {#0}}",
                ]);
              }
            }}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(`\\mathsf{\\sqrt{\\square}}`),
            }}
          />
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={() => {
              if (mf.current) {
                (mf.current as unknown as MathfieldElement).executeCommand([
                  "insert",
                  "\\mathsf{^2}",
                  { focus: true },
                ]);
              }
            }}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(`\\mathsf{\\square^2}`),
            }}
          />
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={() => {
              if (mf.current) {
                (mf.current as unknown as MathfieldElement).executeCommand([
                  "insert",
                  "\\mathsf{^ {#1}}",
                  { focus: true },
                ]);
              }
            }}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(`\\mathsf{\\square^\\square}`),
            }}
          />
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={() => {
              if (mf.current) {
                (mf.current as unknown as MathfieldElement).executeCommand([
                  "insert",
                  "\\mathsf{\\log_{#0}#1}",
                  { focus: true },
                ]);
              }
            }}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(`\\mathsf{\\log\\square}`),
            }}
          />
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={() => {
              if (mf.current) {
                (mf.current as unknown as MathfieldElement).executeCommand([
                  "insert",
                  "\\mathsf{\\ln{#0}",
                  { focus: true },
                ]);
              }
            }}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(`\\mathsf{\\ln\\square}`),
            }}
          />
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={() => {
              if (mf.current) {
                (mf.current as unknown as MathfieldElement).executeCommand([
                  "insert",
                  "\\mathsf{\\log",
                  { focus: true },
                ]);
              }
            }}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(`\\mathsf{(-)}`),
            }}
          />
          <Button size={"lg"} variant={"ghost"}>
            .,.
          </Button>
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={() => {
              if (mf.current) {
                (mf.current as unknown as MathfieldElement).executeCommand([
                  "insert",
                  "\\mathsf{\\log{#0}",
                  { focus: true },
                ]);
              }
            }}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(`\\mathsf{\\frac{1}{\\square}}`),
            }}
          />
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={() => {
              if (mf.current) {
                (mf.current as unknown as MathfieldElement).executeCommand([
                  "insert",
                  "\\mathsf{\\sin{#0}",
                  { focus: true },
                ]);
              }
            }}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(`\\mathsf{\\sin}`),
            }}
          />
          <Button size={"lg"} variant={"ghost"}>
            cos
          </Button>
          <Button size={"lg"} variant={"ghost"}>
            tan
          </Button>
          <Button size={"lg"} variant={"ghost"}>
            sto
          </Button>
          <Button size={"lg"} variant={"ghost"}>
            eng
          </Button>
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={() => {
              if (mf.current) {
                (mf.current as unknown as MathfieldElement).executeCommand([
                  "insert",
                  "\\mathsf{(}",
                  { focus: true },
                ]);
              }
            }}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(`\\mathsf{(}`),
            }}
          />
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={() => {
              if (mf.current) {
                (mf.current as unknown as MathfieldElement).executeCommand([
                  "insert",
                  "\\mathsf{)}",
                  { focus: true },
                ]);
              }
            }}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(`\\mathsf{)}`),
            }}
          />
        </div>
        <div className="grid grid-cols-5 ">
          <div className="grid grid-cols-3 col-span-3  bg-neutral-300">
            {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
              <Button
                key={num}
                className="h-20"
                variant={"number"}
                onClick={() => handleButtonClick(`\\mathsf{${num}}`)}
                dangerouslySetInnerHTML={{
                  __html: katex.renderToString(`\\mathsf{${num.toString()}}`),
                }}
              />
            ))}
            <Button className="h-20" variant={"number"}>
              x10x
            </Button>
            <Button className="h-20" variant={"number"}>
              Ans
            </Button>
          </div>
          <div className="grid grid-cols-2 col-span-2">
            <Button
              className=" rounded-none h-20 bg-orange-400"
              size={"lg"}
              onClick={() => {
                if (mf.current) {
                  setResult("");
                  mf.current.executeCommand(["deleteBackward"]);

                  mf.current.focus();
                }
              }}
              variant={"ghost"}
            >
              DEL
            </Button>
            <Button
              size={"lg"}
              className="rounded-none h-20 bg-orange-400"
              variant={"ghost"}
              onClick={handleReset}
            >
              AC
            </Button>
            <Button
              className="h-20"
              variant={"number"}
              onClick={() => handleButtonClick("+")}
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(`\\mathsf{+}`),
              }}
            />

            <Button
              className="h-20"
              variant={"number"}
              onClick={() => handleButtonClick("-")}
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(`\\mathsf{-}`),
              }}
            />
            <Button
              className="h-20"
              variant={"number"}
              onClick={() => handleButtonClick("\\cdot")}
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(`\\mathsf{\\times}`),
              }}
            />

            <Button
              className="h-20"
              variant={"number"}
              onClick={() => {
                if (mf.current) {
                  mf.current.executeCommand(["extendToPreviousWord"]);
                  (mf.current as unknown as MathfieldElement).executeCommand([
                    "insert",
                    "\\mathsf{\\frac {#0} {#1}}",
                    {
                      insertionMode: "replaceSelection",
                      selectionMode: "placeholder",
                    },
                  ]);
                }
              }}
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(
                  `\\mathsf{\\frac \\square \\blacksquare}`
                ),
              }}
            />

            <Button
              className="h-20"
              variant={"number"}
              onClick={() => handleButtonClick(".")}
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(`\\mathsf{.}`),
              }}
            />

            <Button
              className="h-20"
              variant={"number"}
              onClick={handleResult}
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(`\\mathsf{=}`),
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
