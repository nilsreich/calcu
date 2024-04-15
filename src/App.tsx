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
      setResult(
        convertAsciiMathToLatex(
          evaluate(
            convertLatexToAsciiMath(
              (mf.current as MathfieldElement).getValue() || ""
            )
          ).toString()
        )
      );
    }
  };

  const handleReset = () => {
    setInput(() => "");
    setResult(() => "");
    mf.current?.executeCommand(["deleteAll"]);
  };
  return (
    <main className="flex flex-col h-svh">
      <div className="grow flex flex-col  bg-neutral-100">
        <div className="grow">{""}</div>
        <div className="text-5xl p-2 overflow-scroll flex justify-end">
          <math-field
            onContextMenu={(event: React.MouseEvent) => event.preventDefault()}
            style={{ all: "unset" }}
            ref={mf}
            onChange={(event: React.FormEvent<MathfieldElement>) =>
              setInput(event.currentTarget.value)
            }
          >
            {Input}
          </math-field>
        </div>
        <div className="text-3xl p-2 flex justify-end w-full">
          <math-field read-only style={{ all: "unset" }}>
            {result}
          </math-field>
        </div>
      </div>
      <div className="">
        <div className="grid grid-cols-6 bg-neutral-800 text-neutral-200">
          <Button size={"lg"} variant={"ghost"}>
            shift
          </Button>
          <Button size={"lg"} variant={"ghost"}>
            alpha
          </Button>
          <div className="col-span-2 row-span-3 self-center grid grid-cols-3 grid-rows-3">
            <Button
              variant={"ghost"}
              className="col-start-2 text-bl"
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
              className="row-start-2"
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
              className="row-start-3 col-start-2"
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
          <Button size={"lg"} variant={"ghost"}>
            menu
          </Button>
          <Button size={"lg"} variant={"ghost"}>
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
          <Button size={"lg"} variant={"ghost"}>
            x
          </Button>

          <Button size={"lg"} variant={"ghost"}>
            frac
          </Button>
          <Button size={"lg"} variant={"ghost"}>
            sqrt
          </Button>
          <Button size={"lg"} variant={"ghost"}>
            x^-2
          </Button>
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={() => handleButtonClick("^")}
          >
            x^
          </Button>
          <Button size={"lg"} variant={"ghost"}>
            log
          </Button>
          <Button size={"lg"} variant={"ghost"}>
            ln
          </Button>
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={() => handleButtonClick("-")}
          >
            (-)
          </Button>
          <Button size={"lg"} variant={"ghost"}>
            .,.
          </Button>
          <Button size={"lg"} variant={"ghost"}>
            x^-1
          </Button>
          <Button size={"lg"} variant={"ghost"}>
            sin
          </Button>
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
            onClick={() => handleButtonClick("(")}
          >
            (
          </Button>
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={() => handleButtonClick(")")}
          >
            )
          </Button>
        </div>
        <div className="grid grid-cols-5 border-t">
          <div className="grid grid-cols-3 col-span-3">
            {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
              <Button
                className="text-2xl rounded-none h-20"
                key={num}
                size={"lg"}
                variant={"ghost"}
                onClick={() => handleButtonClick(`${num}`)}
              >
                {num}
              </Button>
            ))}
            <Button
              className="text-2xl rounded-none h-20"
              size={"lg"}
              variant={"ghost"}
            >
              x10x
            </Button>
            <Button
              className="text-2xl rounded-none h-20"
              size={"lg"}
              variant={"ghost"}
            >
              Ans
            </Button>
          </div>
          <div className="grid grid-cols-2 col-span-2">
            <Button
              className="text-2xl rounded-none h-20 text-pink-600"
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
              className="text-2xl rounded-none h-20 text-pink-600"
              variant={"ghost"}
              onClick={handleReset}
            >
              AC
            </Button>
            <Button
              className="text-2xl rounded-none h-20"
              size={"lg"}
              variant={"ghost"}
              onClick={() => handleButtonClick("+")}
            >
              +
            </Button>
            <Button
              className="text-2xl rounded-none h-20"
              size={"lg"}
              variant={"ghost"}
              onClick={() => handleButtonClick("-")}
            >
              -
            </Button>
            <Button
              className="text-2xl rounded-none h-20"
              variant={"ghost"}
              size={"lg"}
              onClick={() => handleButtonClick("\\cdot")}
            >
              x
            </Button>
            <Button
              className="text-2xl rounded-none h-20"
              variant={"ghost"}
              size={"lg"}
              onClick={() => {
                if (mf.current) {
                  mf.current.executeCommand(["extendToPreviousWord"]);
                  (mf.current as unknown as MathfieldElement).executeCommand([
                    "insert",
                    "\\frac {#0} {#1}",
                    {
                      insertionMode: "replaceSelection",
                      selectionMode: "placeholder",
                    },
                  ]);
                }
              }}
            >
              ÷
            </Button>
            <Button
              className="text-2xl rounded-none h-20"
              variant={"ghost"}
              size={"lg"}
              onClick={() =>
                mf?.current?.executeCommand(["moveToPreviousChar"])
              }
            >
              ,
            </Button>

            <Button
              className="text-2xl rounded-none h-20 bg-blue-500 text-white"
              variant={"ghost"}
              size={"lg"}
              onClick={handleResult}
            >
              =
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
