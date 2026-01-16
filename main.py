#!/usr/bin/env python3
"""
SachetAI - NDRF Disaster Response
Root entry point

Usage:
    uv run python main.py           # server mode
    uv run python main.py --cli     # interactive
    uv run python main.py --test    # quick test
"""

import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from run import main

if __name__ == "__main__":
    main()