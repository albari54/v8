// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --opt --no-always-opt --deopt-every-n-times=3

// Check that stress deopt count resets correctly

// Function with two deopt points
function f(x) {
  return x + 1;
}

f(1);
%OptimizeFunctionOnNextCall(f);

// stress_deopt_count == 3

f(1);
assertOptimized(f, undefined, undefined, false);

// stress_deopt_count == 2

f(1);
assertOptimized(f, undefined, undefined, false);

// stress_deopt_count == 1

f(1);
// deopt & counter reset
assertUnoptimized(f, undefined, undefined, false);

// stress_deopt_count == 3

%OptimizeFunctionOnNextCall(f);
f(1);
assertOptimized(f, undefined, undefined, false);

// stress_deopt_count == 2

f(1);
assertOptimized(f, undefined, undefined, false);

// stress_deopt_count == 1

f(1);
// deopt & counter reset
assertUnoptimized(f, undefined, undefined, false);
