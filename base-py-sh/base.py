#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import importlib

try:
    from importlib import metadata  # Python 3.8+
except ImportError:
    import importlib_metadata as metadata  # for older versions

def safe_import(pkg_name):
    try:
        return importlib.import_module(pkg_name)
    except Exception:
        return None

print('\n\n')
print('\n' * 2)
