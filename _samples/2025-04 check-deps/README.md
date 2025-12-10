# check-deps

Checks whether the dependency versions declared in the current package.json
exist on the specified npm registry. Exits with code 1 when something is
missing or unsatisfied so it can be wired into CI.

Usage:
  node index.js                # check against public npm registry
  node index.js --registry https://registry.npmmirror.com/
