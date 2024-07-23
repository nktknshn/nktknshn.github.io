!function(r) {
  "undefined" != typeof module && "object" == typeof exports
    ? module.exports = r()
    : "undefined" != typeof define && define.amd
    ? define(r)
    : ("undefined" != typeof self ? self : this).fzstd = r();
}(function() {
  function r(r, t, e, n) {
    if (o.prototype.copyWithin) return o.prototype.copyWithin.call(r, t, e, n);
    for ((null == e || e < 0) && (e = 0), (null == n || n > r.length) && (n = r.length); e < n;) r[t++] = r[e++];
  }
  function t(r, t) {
    var e, n, s, i, a, u, f, l = r[0] | r[1] << 8 | r[2] << 16;
    return 3126568 == l && 253 == r[3]
      ? (f = (n = r[4]) >> 5 & 1,
        e = n >> 2 & 1,
        i = 3 & n,
        a = n >> 6,
        8 & n && y(0),
        s = v(r, n = 6 - f, i = 3 == i ? 4 : i),
        u = a = v(r, n += i, i = a ? 1 << a : f) + (1 == a && 256),
        2145386496 < (u = f ? u : (f = 1 << 10 + (r[5] >> 3)) + (f >> 3) * (7 & r[5])) && y(1),
        (f = new o((1 == t ? a || u : t ? 0 : u) + 12))[0] = 1,
        f[4] = 4,
        f[8] = 8,
        {
          b: n + i,
          y: 0,
          l: 0,
          d: s,
          w: t && 1 != t ? t : f.subarray(12),
          e: u,
          o: new h(f.buffer, 0, 3),
          u: a,
          c: e,
          m: Math.min(131072, u),
        })
      : 25481893 == (l >> 4 | r[3] << 20)
      ? p(r, 4) + 8
      : void y(0);
  }
  function e(r, t) {
    for (var e = r.length, n = new h(e), s = 0; s < e; ++s) n[s] = t, t += 1 << r[s];
    return n;
  }
  function n(r, t, e) {
    var n = t.b, s = (i = r[n]) >> 1 & 3, i = (t.l = 1 & i, i >> 3 | r[n + 1] << 5 | r[n + 2] << 13), a = (n += 3) + i;
    if (1 == s) return n >= r.length ? void 0 : (t.b = n + 1, e ? (c(e, r[n], t.y, t.y += i), e) : c(new o(i), r[n]));
    if (!(a > r.length)) {
      if (0 == s) return t.b = a, e ? (e.set(r.subarray(n, a), t.y), t.y += i, e) : l(r, n, a);
      if (2 == s) {
        var f = (i = r[n]) >> 2 & 3,
          h = i >> 4,
          b = 0,
          v = 0,
          p = ((s = 3 & i) < 2
            ? 1 & f ? h |= r[++n] << 4 | (2 & f && r[++n] << 12) : h = i >> 3
            : b = (v = f) < 2
              ? (h |= (63 & r[++n]) << 4, r[n] >> 6 | r[++n] << 2)
              : 2 == f
              ? (h |= r[++n] << 4 | (3 & r[++n]) << 12, r[n] >> 2 | r[++n] << 6)
              : (h |= r[++n] << 4 | (63 & r[++n]) << 12, r[n] >> 6 | r[++n] << 2 | r[++n] << 10),
            ++n,
            e ? e.subarray(t.y, t.y + t.m) : new o(t.m)),
          B = p.length - h,
          I = (0 == s
            ? p.set(r.subarray(n, n += h), B)
            : 1 == s
            ? c(p, r[n++], B)
            : (i = t.h,
              2 == s ? (b += n - (n = (f = g(r, n))[0]), t.h = i = f[1]) : i || y(0),
              (v ? x : S)(r.subarray(n, n += b), p.subarray(B), i)),
            r[n++]);
        if (I) {
          255 == I ? I = 32512 + (r[n++] | r[n++] << 8) : 127 < I && (I = I - 128 << 8 | r[n++]);
          var U = r[n++];
          3 & U && y(0);
          for (var D = [z, E, m], M = 2; -1 < M; --M) {
            var W, j = U >> 2 + (M << 1) & 3;
            1 == j
              ? (W = new o([0, 0, r[n++]]),
                D[M] = { s: W.subarray(2, 3), n: W.subarray(0, 1), t: new u(W.buffer, 0, 1), b: 0 })
              : 2 == j
              ? (n = (W = d(r, n, 9 - (1 & M)))[0], D[M] = W[1])
              : 3 == j && (t.t || y(0), D[M] = t.t[M]);
          }
          var O = (s = t.t = D)[0],
            C = s[1],
            H = s[2],
            L = ((f = r[a - 1]) || y(0), (a << 3) - 8 + w(f) - H.b),
            Z = 0,
            q = (r[Y = L >> 3] | r[1 + Y] << 8) >> (7 & L) & (1 << H.b) - 1,
            G = (r[Y = (L -= C.b) >> 3] | r[1 + Y] << 8) >> (7 & L) & (1 << C.b) - 1,
            J = (r[Y = (L -= O.b) >> 3] | r[1 + Y] << 8) >> (7 & L) & (1 << O.b) - 1;
          for (++I; --I;) {
            var K = H.s[q],
              N = H.n[q],
              P = O.s[J],
              Q = O.n[J],
              R = C.s[G],
              V = C.n[G],
              X = 1 << R,
              Y =
                (R = X + ((r[Y = (L -= R) >> 3] | r[1 + Y] << 8 | r[2 + Y] << 16 | r[3 + Y] << 24) >>> (7 & L) & X - 1),
                  (L -= T[P]) >> 3),
              $ = F[P] + ((r[Y] | r[1 + Y] << 8 | r[2 + Y] << 16) >> (7 & L) & (1 << T[P]) - 1),
              _ = (Y = (L -= k[K]) >> 3, A[K] + ((r[Y] | r[1 + Y] << 8 | r[2 + Y] << 16) >> (7 & L) & (1 << k[K]) - 1));
            for (
              Y = (L -= N) >> 3,
                q = H.t[q] + ((r[Y] | r[1 + Y] << 8) >> (7 & L) & (1 << N) - 1),
                Y = (L -= Q) >> 3,
                J = O.t[J] + ((r[Y] | r[1 + Y] << 8) >> (7 & L) & (1 << Q) - 1),
                Y = (L -= V) >> 3,
                G = C.t[G] + ((r[Y] | r[1 + Y] << 8) >> (7 & L) & (1 << V) - 1),
                3 < R
                  ? (t.o[2] = t.o[1], t.o[1] = t.o[0], t.o[0] = R -= 3)
                  : (X = R - (0 != _))
                  ? (R = 3 == X ? t.o[0] - 1 : t.o[X], 1 < X && (t.o[2] = t.o[1]), t.o[1] = t.o[0], t.o[0] = R)
                  : R = t.o[0],
                M = 0;
              M < _;
              ++M
            ) {
              p[Z + M] = p[B + M];
            }
            B += _;
            var rr = (Z += _) - R;
            if (rr < 0) {
              var tr = -rr, er = t.e + rr;
              for ($ < tr && (tr = $), M = 0; M < tr; ++M) p[Z + M] = t.w[er + M];
              Z += tr, $ -= tr, rr = 0;
            }
            for (M = 0; M < $; ++M) p[Z + M] = p[rr + M];
            Z += $;
          }
          if (Z != B) { for (; B < p.length;) p[Z++] = p[B++]; }
          else Z = p.length;
          e ? t.y += Z : p = l(p, 0, Z);
        } else if (e) { if (t.y += h, B) { for (M = 0; M < h; ++M) p[M] = p[B + M]; } }
        else B && (p = l(p, B));
        return t.b = a, p;
      }
      y(2);
    }
  }
  function s(r, t) {
    if (1 == r.length) return r[0];
    for (var e = new o(t), n = 0, s = 0; n < r.length; ++n) {
      var i = r[n];
      e.set(i, s), s += i.length;
    }
    return e;
  }
  var i = {},
    a = ArrayBuffer,
    o = Uint8Array,
    u = Uint16Array,
    f = Int16Array,
    h = (Uint32Array, Int32Array),
    l = function(r, t, e) {
      if (o.prototype.slice) return o.prototype.slice.call(r, t, e);
      (null == e || e > r.length) && (e = r.length);
      var n = new o(e - (t = null == t || t < 0 ? 0 : t));
      return n.set(r.subarray(t, e)), n;
    },
    c = function(r, t, e, n) {
      if (o.prototype.fill) return o.prototype.fill.call(r, t, e, n);
      for ((null == e || e < 0) && (e = 0), (null == n || n > r.length) && (n = r.length); e < n; ++e) r[e] = t;
      return r;
    },
    b = (i.ZstdErrorCode = {
      InvalidData: 0,
      WindowSizeTooLarge: 1,
      InvalidBlockType: 2,
      FSEAccuracyTooHigh: 3,
      DistanceTooFarBack: 4,
      UnexpectedEOF: 5,
    },
      [
        "invalid zstd data",
        "window size too large (>2046MB)",
        "invalid block type",
        "FSE accuracy too high",
        "match distance too far back",
        "unexpected EOF",
      ]),
    y = function(r, t, e) {
      if ((t = Error(t || b[r])).code = r, Error.captureStackTrace && Error.captureStackTrace(t, y), e) return t;
      throw t;
    },
    v = function(r, t, e) {
      for (var n = 0, s = 0; n < e; ++n) s |= r[t++] << (n << 3);
      return s;
    },
    p = function(r, t) {
      return (r[t] | r[t + 1] << 8 | r[t + 2] << 16 | r[t + 3] << 24) >>> 0;
    },
    w = function(r) {
      for (var t = 0; 1 << t <= r; ++t);
      return t - 1;
    },
    d = function(r, t, e) {
      var n = 4 + (t << 3), s = 5 + (15 & r[t]);
      e < s && y(3);
      for (
        var i = 1 << s,
          h = i,
          l = -1,
          c = -1,
          b = i,
          v = (t = new a(512 + (i << 2)), new f(t, 0, 256)),
          p = new u(t, 0, 256),
          d = new u(t, 512, i),
          g = new o(t, e = 512 + (i << 1), i),
          m = new o(t, e + i);
        l < 255 && 0 < h;
      ) {
        var z,
          E = w(h + 1),
          k = (1 << E + 1) - 1,
          A = (1 << E) - 1,
          T = (z = (r[z = n >> 3] | r[1 + z] << 8 | r[2 + z] << 16) >> (7 & n) & k) & A;
        if (
          T < (k = k - h - 1) ? (n += E, z = T) : (n += E + 1, A < z && (z -= k)),
            v[++l] = --z,
            -1 == z ? (h += z, g[--b] = l) : h -= z,
            !z
        ) {
          do {
            var F = (r[F = n >> 3] | r[1 + F] << 8) >> (7 & n) & 3;
          } while (n += 2, l += F, 3 == F);
        }
      }
      (255 < l || h) && y(0);
      for (var S = 0, x = (i >> 1) + (i >> 3) + 3, B = i - 1, I = 0; I <= l; ++I) {
        var U = v[I];
        if (U < 1) p[I] = -U;
        else for (c = 0; c < U; ++c) for (g[S] = I; b <= (S = S + x & B););
      }
      for (S && y(0), c = 0; c < i; ++c) {
        var D = p[g[c]]++, M = m[c] = s - w(D);
        d[c] = (D << M) - i;
      }
      return [n + 7 >> 3, { b: s, s: g, n: m, t: d }];
    },
    g = function(r, t) {
      var e = 0,
        n = -1,
        s = new o(292),
        i = r[t],
        a = s.subarray(0, 256),
        f = s.subarray(256, 268),
        h = new u(s.buffer, 268);
      if (i < 128) {
        var l = (s = d(r, t + 1, 6))[1], b = s[0] << 3;
        (s = r[t += i]) || y(0);
        for (var v = 0, p = 0, g = l.b, m = g, z = (++t << 3) - 8 + w(s); !((z -= g) < b);) {
          var E = z >> 3;
          if (a[++n] = l.s[v += (r[E] | r[1 + E] << 8) >> (7 & z) & (1 << g) - 1], (z -= m) < b) break;
          a[++n] = l.s[p += (r[E = z >> 3] | r[1 + E] << 8) >> (7 & z) & (1 << m) - 1],
            g = l.n[v],
            v = l.t[v],
            m = l.n[p],
            p = l.t[p];
        }
        255 < ++n && y(0);
      } else {
        for (n = i - 127; e < n; e += 2) {
          var k = r[++t];
          a[e] = k >> 4, a[e + 1] = 15 & k;
        }
        ++t;
      }
      var A = 0;
      for (e = 0; e < n; ++e) 11 < (T = a[e]) && y(0), A += T && 1 << T - 1;
      var T, F = w(A) + 1;
      for ((i = (s = 1 << F) - A) & i - 1 && y(0), a[n++] = w(i) + 1, e = 0; e < n; ++e) {
        ++f[a[e] = (T = a[e]) && F + 1 - T];
      }
      var S = (i = new o(s << 1)).subarray(0, s), x = i.subarray(s);
      for (h[F] = 0, e = F; 0 < e; --e) {
        var B = h[e];
        c(x, e, B, h[e - 1] = B + f[e] * (1 << F - e));
      }
      for (h[0] != s && y(0), e = 0; e < n; ++e) {
        var I, U = a[e];
        U && (I = h[U], c(S, e, I, h[U] = I + (1 << F - U)));
      }
      return [t, { n: x, b: F, s: S }];
    },
    m = d(new o([81, 16, 99, 140, 49, 198, 24, 99, 12, 33, 196, 24, 99, 102, 102, 134, 70, 146, 4]), 0, 6)[1],
    z = d(
      new o([
        33,
        20,
        196,
        24,
        99,
        140,
        33,
        132,
        16,
        66,
        8,
        33,
        132,
        16,
        66,
        8,
        33,
        68,
        68,
        68,
        68,
        68,
        68,
        68,
        68,
        36,
        9,
      ]),
      0,
      6,
    )[1],
    E = d(new o([32, 132, 16, 66, 102, 70, 68, 68, 68, 68, 36, 73, 2]), 0, 5)[1],
    k = new o(new h([0, 0, 0, 0, 16843009, 50528770, 134678020, 202050057, 269422093]).buffer, 0, 36),
    A = e(k, 0),
    T = new o(new h([0, 0, 0, 0, 0, 0, 0, 0, 16843009, 50528770, 117769220, 185207048, 252579084, 16]).buffer, 0, 53),
    F = e(T, 3),
    S = function(r, t, e) {
      var n = r.length, s = t.length, i = r[n - 1], a = (1 << e.b) - 1, o = -e.b;
      i || y(0);
      for (var u = 0, f = e.b, h = (n << 3) - 8 + w(i) - f, l = -1; o < h && l < s;) {
        var c = h >> 3;
        t[++l] = e.s[u = (u << f | (r[c] | r[1 + c] << 8 | r[2 + c] << 16) >> (7 & h)) & a], h -= f = e.n[u];
      }
      h == o && l + 1 == s || y(0);
    },
    x = function(r, t, e) {
      var n = 6, s = t.length + 3 >> 2, i = s << 1, a = s + i;
      S(r.subarray(6, n += r[0] | r[1] << 8), t.subarray(0, s), e),
        S(r.subarray(n, n += r[2] | r[3] << 8), t.subarray(s, i), e),
        S(r.subarray(n, n += r[4] | r[5] << 8), t.subarray(i, a), e),
        S(r.subarray(n), t.subarray(a), e);
    };
  function B(r) {
    this.ondata = r, this.c = [], this.l = 0, this.z = 0;
  }
  return i.decompress = function(e, i) {
    for (var a = 0, o = [], u = +!i, f = 0; e.length;) {
      var h = t(e, u || i);
      if ("object" == typeof h) {
        for (u ? (i = null, h.w.length == h.u && (o.push(i = h.w), f += h.u)) : (o.push(i), h.e = 0); !h.l;) {
          var l = n(e, h, i);
          l || y(5), i ? h.e = h.y : (o.push(l), f += l.length, r(h.w, 0, l.length), h.w.set(l, h.w.length - l.length));
        }
        a = h.b + 4 * h.c;
      } else a = h;
      e = e.subarray(a);
    }
    return s(o, f);
  },
    B.prototype.push = function(e, i) {
      "number" == typeof this.s && (a = Math.min(e.length, this.s), e = e.subarray(a), this.s -= a);
      var a = e.length + this.l;
      if (!this.s) {
        if (i) {
          if (!a) return;
          a < 5 && y(5);
        } else if (a < 18) return this.c.push(e), void (this.l = a);
        if (this.l && (this.c.push(e), e = s(this.c, a), this.c = [], this.l = 0), "number" == typeof (this.s = t(e))) {
          return this.push(e, i);
        }
      }
      if ("number" != typeof this.s) {
        if (a < (this.z || 4)) i && y(5), this.c.push(e), this.l = a;
        else if (
          this.l && (this.c.push(e), e = s(this.c, a), this.c = [], this.l = 0),
            !this.z && a < (this.z = 2 & e[this.s.b]
                ? 5
                : 4 + (e[this.s.b] >> 3 | e[this.s.b + 1] << 5 | e[this.s.b + 2] << 13))
        ) i && y(5), this.c.push(e), this.l = a;
        else {for (this.z = 0;;) {
            var o, u = n(e, this.s);
            if (!u) return i && y(5), o = e.subarray(this.s.b), this.s.b = 0, this.c.push(o), void (this.l += o.length);
            if (this.ondata(u, !1), r(this.s.w, 0, u.length), this.s.w.set(u, this.s.w.length - u.length), this.s.l) {
              return o = e.subarray(this.s.b), this.s = 4 * this.s.c, void this.push(o, i);
            }
          }}
      }
    },
    i.Decompress = B,
    i;
});

var B64_codes = [
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  62,
  255,
  255,
  255,
  63,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  255,
  255,
  255,
  0,
  255,
  255,
  255,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  255,
  255,
  255,
  255,
  255,
  255,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
];
function B64_Len(e) {
  return e.length / 4 * 3 | 0;
}
function B64_U8(e, r, n) {
  if (r && r % 3 != 0) throw "Inv `from`";
  var t = e.length;
  n = n || t / 4 * 3;
  for (var o = new Uint8Array(0 | n), s = r ? r / 3 * 4 : 0, a = 0; a <= n; s += 4, a += 3) {
    var i = B64_codes[e.charCodeAt(s)] << 18 | B64_codes[e.charCodeAt(s + 1)] << 12
      | B64_codes[e.charCodeAt(s + 2)] << 6 | B64_codes[e.charCodeAt(s + 3)];
    o[a] = i >> 16;
    o[a + 1] = i >> 8 & 255;
    o[a + 2] = 255 & i;
  }
  return o;
}
function Zstd_DecBin(e) {
  return fzstd.decompress(B64_U8(e));
}
function Zstd_DecStr(e) {
  var r = !0, n = !0;
  try {
    String.fromCharCode.apply(null, [0]);
  } catch (e) {
    r = !1;
  }
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch (e) {
    n = !1;
  }
  return function(e, t) {
    var o, s, a, i, u = t || e.length, f = new Array(2 * u);
    for (s = 0, o = 0; o < u;) {
      if ((a = e[o++]) < 128) f[s++] = a;
      else if ((i = _utf8len[a]) > 4) {
        f[s++] = 65533;
        o += i - 1;
      } else {
        a &= 2 === i ? 31 : 3 === i ? 15 : 7;
        for (; i > 1 && o < u;) {
          a = a << 6 | 63 & e[o++];
          i--;
        }
        if (i > 1) f[s++] = 65533;
        else if (a < 65536) f[s++] = a;
        else {
          a -= 65536;
          f[s++] = 55296 | a >> 10 & 1023;
          f[s++] = 56320 | 1023 & a;
        }
      }
    }
    return function(e, t) {
      if (t < 65534 && (e.subarray && n || !e.subarray && r)) {
        return String.fromCharCode.apply(
          null,
          function(e, r) {
            if (e.length === r) return e;
            if (e.subarray) return e.subarray(0, r);
            e.length = r;
            return e;
          }(e, t),
        );
      }
      for (var o = "", s = 0; s < t; s++) o += String.fromCharCode(e[s]);
      return o;
    }(f, s);
  }(Zstd_DecBin(e));
}

function ArrayBuffer_ToString(e, r) {
  var n = new Blob([new Uint8Array(e)]), t = new FileReader();
  t.onload = function(e) {
    r(e.target.result);
  };
  t.readAsText(n);
}
