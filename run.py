#!/usr/bin/env python3
import argparse
import sys

from config import settings


def banner():
    print("""
========================================
  NDRF DISASTER RESPONSE ASSISTANT
  Maharashtra Real-time Information
  Powered by Groq AI (Llama 3.1)
========================================
    """)


def cli_mode():
    from rag import RAGEngine

    banner()

    if not settings.check():
        print("Set GROQ_API_KEY in .env file")
        print("Get free key: https://console.groq.com/keys")
        sys.exit(1)

    print("Starting...")
    eng = RAGEngine()
    eng.start()

    print("\nReady.  Type question or 'quit' to exit.")
    print("\nSamples:")
    print("  - Current Sholapur flood status?")
    print("  - Landslide evacuation routes?")
    print("  - NDRF helpline?\n")

    while True:
        try:
            inp = input("> ").strip()

            if not inp:
                continue

            if inp.lower() in ["quit", "exit", "q"]:
                break

            if inp.lower() == "status":
                s = eng.status()
                print(f"Docs: {s['docs']} | Updated: {s['updated']}")
                continue

            if inp.lower() == "refresh":
                r = eng.refresh()
                print(f"Refreshed: {r['docs']} docs")
                continue

            print("\nProcessing.. .\n")
            r = eng.ask(inp)

            print("-" * 40)
            print(r["answer"])
            print("-" * 40)
            print(f"Time: {r['time']}\n")

        except KeyboardInterrupt:
            break
        except Exception as e:
            print(f"Error: {e}")

    eng.stop()
    print("Bye!")


def server_mode():
    from api. server import serve

    banner()
    settings.check()

    print(f"Server:  http://{settings.HOST}:{settings. PORT}")
    print(f"Docs: http://{settings.HOST}:{settings.PORT}/docs")
    print("Ctrl+C to stop\n")

    serve()


def test_mode():
    from rag import RAGEngine

    print("Testing...")

    if not settings. GROQ_API_KEY:
        print("FAIL: No API key")
        print("Get free key: https://console.groq.com/keys")
        sys.exit(1)

    eng = RAGEngine()
    eng.pipe.refresh()

    q = "Flood status in Sholapur?"
    r = eng.ask(q)

    print(f"Query: {q}")
    print(f"Response: {len(r['answer'])} chars")
    print(f"Docs: {r['docs']}")
    print("PASS")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--cli", action="store_true")
    parser.add_argument("--server", action="store_true")
    parser.add_argument("--test", action="store_true")

    args = parser.parse_args()

    if args.test:
        test_mode()
    elif args.cli:
        cli_mode()
    else:
        server_mode()


if __name__ == "__main__":
    main()
