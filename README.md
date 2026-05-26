# General setup

### <a name="installing-node"></a> Installing node

---

```bash
# https://github.com/nvm-sh/nvm#install--update-script
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
# or any minor version for node18+
nvm install 24.16.0
nvm use 24.16.0
```

### <a name="installing-pnpm"></a> Install pnpm

---

```bash
# https://pnpm.io/installation
npm install -g pnpm
```

### <a name="installing-docker"></a> Install docker

---

```bash
# https://docs.docker.com/get-docker/
Use docker guide to install docker on your OS
```

# How to run

To run benchmarks locally just use current command.

> Note: make sure you will have docker running as long as benchmark script will create several docker containers with pg instance inside and run each orm library in new one. To prevent pg caching between different orm's running query

```bash
pnpm run start
```

# Sample runs

```text
cpu: Apple M4
runtime: node 24.16.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• select * from customer
------------------------------------------- -------------------------------
pg                           219.17 µs/iter 219.54 µs   █
                      (167.92 µs … 2.19 ms) 511.75 µs   ██
                    (  5.98 kb … 788.84 kb)  86.47 kb ▁▃██▄▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁

pg:p                         196.79 µs/iter 201.63 µs     ▅▇█▂
                    (167.63 µs … 851.00 µs) 254.29 µs    ▂████▄
                    (  1.13 kb …   1.84 mb)  87.35 kb ▁▂▄███████▇▅▄▃▂▂▂▁▁▁▁

postgresjs                   217.16 µs/iter 214.75 µs    ▂██▆▂
                      (186.42 µs … 5.26 ms) 258.29 µs    ██████▃
                    ( 11.32 kb …   1.49 mb)  81.57 kb ▂▅█████████▆▄▃▂▂▂▂▁▁▁

drizzle                      287.15 µs/iter 283.58 µs   ▄█▃
                      (250.38 µs … 2.52 ms) 395.79 µs   ███▃
                    (  8.55 kb …   2.42 mb) 225.94 kb ▂██████▄▃▂▁▁▁▁▁▁▁▁▁▁▁

drizzle:p                    266.82 µs/iter 255.50 µs  █
                      (210.42 µs … 2.91 ms) 713.29 µs  ██
                    ( 21.41 kb …   1.01 mb) 176.82 kb ▂██▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

knex                         213.11 µs/iter 217.38 µs     ▇█▂▂
                      (178.79 µs … 1.92 ms) 282.21 µs    █████▄
                    ( 18.03 kb …   4.14 mb) 101.76 kb ▁▃████████▆▄▃▂▂▁▁▂▁▁▁

kysely                       211.91 µs/iter 206.04 µs   █
                      (175.17 µs … 4.03 ms) 415.33 µs  ▅█▂
                    ( 47.60 kb …   2.92 mb)  88.93 kb ▁███▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

mikro                        756.74 µs/iter 697.96 µs █
                      (529.96 µs … 7.11 ms)   4.15 ms ██
                    ( 33.30 kb …   7.31 mb)   0.98 mb ██▃▄▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

typeorm                      296.19 µs/iter 287.29 µs  █
                      (249.17 µs … 2.27 ms) 838.13 µs  █
                    ( 18.27 kb …   5.66 mb) 214.53 kb ▇█▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

prisma                       301.14 µs/iter 297.21 µs   ▅█
                      (262.75 µs … 2.56 ms) 426.54 µs   ██▇
                    ( 20.56 kb …   4.39 mb) 204.83 kb ▁█████▅▃▂▁▁▁▁▁▁▁▁▁▁▁▁

summary
  pg:p
   1.08x faster than kysely
   1.08x faster than knex
   1.1x faster than postgresjs
   1.11x faster than pg
   1.36x faster than drizzle:p
   1.46x faster than drizzle
   1.51x faster than typeorm
   1.53x faster than prisma
   3.85x faster than mikro

• select * from customer where id = ?
------------------------------------------- -------------------------------
pg                            11.75 ms/iter  11.81 ms   ▂     █▂
                      (11.58 ms … 12.04 ms)  11.96 ms   █   ▂▂██▇▂▂▅
                    ( 26.77 kb …   1.87 mb) 968.68 kb ▇▁█▄▄▇████████▇▄▇▄▄▁▄

pg:p                           9.77 ms/iter  10.47 ms  █
                       (9.20 ms … 10.73 ms)  10.73 ms  ██              ▅▂
                    (470.42 kb …   2.73 mb) 939.52 kb ████▂▂▂▄▁▁▁▁▁▁▁▁▅██▄▄

postgresjs                    10.34 ms/iter  10.39 ms          █
                      (10.13 ms … 10.59 ms)  10.57 ms      █ █▃██▃ ▃
                    (236.21 kb … 996.23 kb) 619.46 kb ▆▆▄▄▆█▆███████▆▆▆▁▆▆▄

drizzle                       24.34 ms/iter  24.52 ms   ██ █
                      (23.65 ms … 26.62 ms)  25.51 ms   ██▅█▅
                    (  2.66 mb …   8.16 mb)   5.22 mb ▇▁█████▁▇▇▇▁▁▇▇▁▁▁▁▇▇

drizzle:p                     19.73 ms/iter  21.25 ms          █          █
                      (17.40 ms … 21.39 ms)  21.36 ms         ▅█         ██
                    (  1.06 mb …   1.48 mb)   1.26 mb █▅▁▅▁█▁▅███▅▁▁▁▅▅▁▁██

knex                          11.60 ms/iter  11.76 ms   █  ▂
                      (11.24 ms … 12.28 ms)  12.27 ms   █  █
                    (  1.94 mb …   2.93 mb)   2.47 mb ▇▇█████▁▃▅▃▃▃▁▃▁▃▅▅▃█

kysely                        11.66 ms/iter  12.06 ms   ▃              █
                      (11.04 ms … 12.25 ms)  12.25 ms  ▆█▆           ▆▆██
                    (  1.50 mb …   1.78 mb)   1.64 mb ████▄▄▄▄▁▁▁▄▁▄█████▁▄

mikro                         14.69 ms/iter  14.89 ms  █  ▃
                      (14.18 ms … 16.22 ms)  15.95 ms  █▃██
                    (  6.72 mb …   7.76 mb)   7.10 mb ▆████▆▆▁▄▁▁▆█▆▁▁▁▆▁▁▄

typeorm                       13.71 ms/iter  13.71 ms  ▄█▂
                      (13.49 ms … 15.00 ms)  14.68 ms ▆███
                    (  3.98 mb …   4.81 mb)   4.42 mb █████▃▅▃▁▃▁▁▁▃▁▁▃▁▁▁▃

prisma                        14.97 ms/iter  15.33 ms  ▃         █
                      (13.74 ms … 18.20 ms)  16.22 ms  █▃        █▃
                    (  3.41 mb …   5.86 mb)   4.79 mb ▄██▄▁▁▁▁▆▄▄███▆▁▄█▄▄▄

summary
  pg:p
   1.06x faster than postgresjs
   1.19x faster than knex
   1.19x faster than kysely
   1.2x faster than pg
   1.4x faster than typeorm
   1.5x faster than mikro
   1.53x faster than prisma
   2.02x faster than drizzle:p
   2.49x faster than drizzle

• select * from customer where company_name ilike ?
------------------------------------------- -------------------------------
pg                             7.74 ms/iter   7.92 ms  █   ▇
                        (7.31 ms … 9.96 ms)   9.59 ms  █   █▃
                    (790.63 kb … 797.64 kb) 791.22 kb ▇█▅▂▅██▂▂▁▁▁▁▁▁▁▁▁▁▁▂

pg:p                           6.93 ms/iter   6.92 ms    ▄█
                        (6.73 ms … 7.90 ms)   7.44 ms   ▂██
                    ( 65.16 kb …   1.45 mb) 769.87 kb ▃█████▆▃▂▃▁▁▁▁▂▁▃▂▅▂▃

postgresjs                    12.28 ms/iter  12.32 ms         █
                      (12.12 ms … 12.45 ms)  12.44 ms       ▃ █▆█  ▆
                    (511.48 kb …   2.99 mb) 588.15 kb ▄▁▁█▆▁█████▆▆█▆▆▄█▁▄▄

drizzle                       14.71 ms/iter  14.90 ms           ▅██▅
                      (13.78 ms … 15.85 ms)  15.52 ms ▃         ████▃▆
                    (  3.09 mb …   4.15 mb)   3.52 mb ███▁▁▁▁▁▄▁██████▁▁▁▁▄

drizzle:p                     12.05 ms/iter  12.34 ms                  █
                       (9.84 ms … 12.88 ms)  12.64 ms                  █▅
                    (166.99 kb …   2.43 mb)   1.31 mb ▂▃▁▂▁▂▂▁▁▁▁▂▁▂▂▁▃██▄▃

knex                           8.32 ms/iter   8.37 ms  ▅▂▂ ▅ █   █
                        (8.17 ms … 9.70 ms)   8.55 ms ▂███▅█▇█▂▇▅█▇▅
                    (  1.58 mb …   1.63 mb)   1.59 mb ██████████████▇▁▄▁▁▁▄

kysely                         7.73 ms/iter   7.73 ms  █▅
                        (7.56 ms … 9.60 ms)   9.07 ms  ██▃
                    (  1.14 mb …   1.18 mb)   1.15 mb ▅███▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▂

mikro                         10.26 ms/iter  10.48 ms   ▅ ▃ █ █
                       (9.71 ms … 11.43 ms)  11.17 ms  ▃█ █ █▃█
                    (  5.30 mb …   7.53 mb)   6.73 mb ███▄█▆███▁▁▆▄█▄▆▆▆▁▄▆

typeorm                        9.36 ms/iter   9.38 ms      █
                       (8.89 ms … 10.82 ms)  10.52 ms     ▅█▅
                    (  1.74 mb …   4.28 mb)   3.09 mb ▅▃▅▃███▄▁▃▂▂▁▂▁▁▁▂▁▂▂

prisma                         9.54 ms/iter   9.59 ms      █
                       (9.07 ms … 11.11 ms)  11.04 ms      █
                    (  1.61 mb …   3.63 mb)   2.62 mb ▅▅▃▂▇██▃▁▁▁▁▂▁▁▁▁▁▁▁▂

summary
  pg:p
   1.12x faster than kysely
   1.12x faster than pg
   1.2x faster than knex
   1.35x faster than typeorm
   1.38x faster than prisma
   1.48x faster than mikro
   1.74x faster than drizzle:p
   1.77x faster than postgresjs
   2.12x faster than drizzle

• "SELECT * FROM employee"
------------------------------------------- -------------------------------
pg                           146.18 µs/iter 142.08 µs     █
                      (113.38 µs … 5.42 ms) 239.63 µs    ██▄
                    ( 21.90 kb … 489.84 kb)  27.06 kb ▁▂▆███▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁

pg:p                         135.67 µs/iter 136.08 µs        █
                       (96.33 µs … 2.20 ms) 199.58 µs       ██▇
                    ( 14.66 kb … 426.29 kb)  27.48 kb ▁▁▁▁▂▆███▄▂▁▁▁▁▁▁▁▁▁▁

drizzle                      176.21 µs/iter 177.87 µs      ▂▇█
                      (135.08 µs … 1.48 ms) 247.67 µs     ▃████
                    (  4.42 kb … 944.73 kb)  87.47 kb ▁▁▁▃█████▇▃▂▁▁▁▁▁▁▁▁▁

drizzle:p                    137.19 µs/iter 140.38 µs       ▄█▆▅▂
                      (114.42 µs … 1.81 ms) 165.75 µs     ▂██████▆▂
                    ( 22.13 kb … 553.09 kb)  36.10 kb ▁▂▃▇█████████▇▄▂▂▁▁▁▁

knex                         140.05 µs/iter 144.71 µs        █▅
                      (102.54 µs … 1.90 ms) 206.38 µs      ▃███▄
                    (432.00  b … 360.59 kb)  42.28 kb ▁▃▅▆▆█████▅▂▂▁▁▁▁▁▁▁▁

kysely                       133.32 µs/iter 139.96 µs             ▃▆█▄
                       (92.71 µs … 1.88 ms) 155.50 µs           ▃▇█████▂
                    ( 27.93 kb … 260.30 kb)  32.69 kb ▁▅▆▅▃▂▁▂▃▆████████▅▃▂

mikro                        224.60 µs/iter 220.29 µs      █
                      (166.21 µs … 2.64 ms) 340.00 µs     ▅██
                    (  3.54 kb …   2.14 mb) 195.04 kb ▁▁▁▂███▇▄▂▂▁▁▁▁▁▁▁▁▁▁

typeorm                      181.38 µs/iter 181.46 µs     ▄█▃
                      (156.21 µs … 1.52 ms) 233.33 µs     ███▃
                    (  6.98 kb …   1.22 mb)  94.80 kb ▁▂▃█████▆▄▃▂▂▂▁▁▁▁▁▁▁

prisma                       177.54 µs/iter 177.71 µs       █▆
                      (152.17 µs … 2.06 ms) 215.17 µs      ████
                    (  1.60 kb …   1.01 mb)  73.09 kb ▁▁▂▄██████▇▄▂▂▂▁▁▁▁▁▁

summary
  kysely
   1.02x faster than pg:p
   1.03x faster than drizzle:p
   1.05x faster than knex
   1.1x faster than pg
   1.32x faster than drizzle
   1.33x faster than prisma
   1.36x faster than typeorm
   1.68x faster than mikro

• select * from employee where id = ? left join reportee
------------------------------------------- -------------------------------
pg                             1.36 ms/iter   1.37 ms         ▂▄███
                        (1.29 ms … 2.22 ms)   1.41 ms       ▆▅█████▇▆▃
                    (125.77 kb … 686.36 kb) 128.09 kb ▁▁▂▃▃███████████▆▂▂▁▁

pg:p                           1.05 ms/iter   1.09 ms              ██▅
                      (925.33 µs … 3.03 ms)   1.14 ms     ▂▅▂     ▃████
                    (127.55 kb … 615.78 kb) 128.80 kb ▁▂▅▆███▆▃▂▂▅█████▆▂▁▂

drizzle                        3.47 ms/iter   3.47 ms  █
                        (3.32 ms … 7.29 ms)   4.89 ms  █▆
                    (250.75 kb …   4.29 mb)   1.39 mb ▆██▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

drizzle:p                      2.52 ms/iter   2.54 ms        █
                        (2.45 ms … 2.97 ms)   2.62 ms     ▂▃▃███▆▄▃
                    (156.35 kb …   1.54 mb) 218.08 kb ▂▄▄▇█████████▆▅▃▂▃▃▂▂

knex                           1.58 ms/iter   1.59 ms   █▇
                        (1.49 ms … 2.19 ms)   1.94 ms  ▂██▅
                    ( 36.93 kb …   1.34 mb) 587.81 kb ▃████▆▆▆▄▃▂▂▁▁▁▁▁▁▁▁▁

kysely                         1.66 ms/iter   1.66 ms   █
                        (1.59 ms … 3.69 ms)   2.08 ms  ██▅
                    ( 80.01 kb …   3.12 mb) 398.32 kb ▄███▅▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁

mikro                          2.31 ms/iter   2.36 ms ▅█
                        (2.03 ms … 5.95 ms)   4.58 ms ██
                    (394.60 kb …   3.63 mb)   1.91 mb ██▅▄▅▃▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁

typeorm                        3.59 ms/iter   3.68 ms  ██
                        (3.37 ms … 4.55 ms)   4.37 ms  ██▃▃▆▇
                    (471.54 kb …   3.16 mb)   1.81 mb ████████▆▆▄▃▂▂▂▂▁▁▂▁▂

prisma                         3.02 ms/iter   2.97 ms  █
                        (2.84 ms … 7.06 ms)   4.56 ms  █
                    (263.29 kb …   2.24 mb) 936.84 kb ██▇▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

summary
  pg:p
   1.29x faster than pg
   1.5x faster than knex
   1.58x faster than kysely
   2.2x faster than mikro
   2.4x faster than drizzle:p
   2.87x faster than prisma
   3.3x faster than drizzle
   3.41x faster than typeorm

• SELECT * FROM supplier
------------------------------------------- -------------------------------
pg                           148.22 µs/iter 151.04 µs          ▂▅▆█▆
                      (121.63 µs … 3.33 ms) 165.88 µs       ▂▄▆██████▄
                    ( 29.99 kb … 253.99 kb)  30.34 kb ▁▂▂▃▅▇███████████▅▄▂▁

pg:p                         144.53 µs/iter 146.42 µs           ▅█▆▂
                      (119.00 µs … 3.10 ms) 161.29 µs         ▄█████▅
                    ( 30.83 kb … 414.83 kb)  31.40 kb ▁▁▁▂▂▃▅▇████████▅▃▂▂▁

drizzle                      178.61 µs/iter 179.75 µs     ▂▇█▇▆
                      (157.25 µs … 1.80 ms) 210.00 µs    ▂██████▃
                    (920.00  b … 987.86 kb)  99.10 kb ▁▂▅████████▆▄▃▂▂▁▁▁▁▁

drizzle:p                    159.13 µs/iter 161.71 µs        ▇█▆
                      (132.58 µs … 2.13 ms) 194.54 µs     ▅▇█████▂
                    (  4.20 kb … 680.16 kb)  61.60 kb ▁▂▃▇████████▆▄▂▂▁▁▁▁▁

knex                         150.38 µs/iter 153.21 µs       ▂▅█▇▄▅▂
                      (125.71 µs … 2.38 ms) 172.67 µs      ▃███████▆▂
                    ( 33.48 kb …   1.31 mb)  45.63 kb ▁▂▂▄▇██████████▆▄▃▂▁▁

kysely                       153.85 µs/iter 155.08 µs         ▆██▅
                      (133.29 µs … 2.52 ms) 171.25 µs       ▅▇████▇▂
                    (  4.47 kb … 608.79 kb)  38.13 kb ▁▁▂▃▄▆████████▇▅▃▂▂▂▁

mikro                        310.93 µs/iter 292.04 µs  █▄
                      (241.25 µs … 3.57 ms) 764.17 µs  ██
                    (  8.05 kb …   1.33 mb) 345.82 kb ▁██▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

typeorm                      192.55 µs/iter 192.67 µs          ▂█▂
                      (144.63 µs … 2.30 ms) 230.71 µs          ███
                    (  8.98 kb …   1.32 mb) 101.94 kb ▁▁▂▁▂▁▁▂▇████▅▂▂▂▁▁▁▁

prisma                       193.25 µs/iter 192.58 µs     ▃█▆
                      (172.58 µs … 2.33 ms) 224.29 µs    ▂████▅
                    ( 16.00  b … 518.59 kb)  75.98 kb ▁▃▄███████▆▄▃▂▂▂▁▁▁▁▁

summary
  pg:p
   1.03x faster than pg
   1.04x faster than knex
   1.06x faster than kysely
   1.1x faster than drizzle:p
   1.24x faster than drizzle
   1.33x faster than typeorm
   1.34x faster than prisma
   2.15x faster than mikro

• select * from supplier where id = ?
------------------------------------------- -------------------------------
pg                             3.52 ms/iter   3.68 ms    █▃            █
                        (3.30 ms … 3.81 ms)   3.76 ms   ▅██▄          ▅█ ▂
                    (294.33 kb …   1.37 mb) 302.32 kb ▃▇█████▃▂▄▅▃▃▂▅▇████▃

pg:p                           3.29 ms/iter   3.34 ms         █
                        (2.88 ms … 4.63 ms)   3.97 ms        ▃█▂
                    (281.86 kb … 287.07 kb) 282.23 kb ▂▆▃▂▂▁▁███▂▂▁▁▁▂▁▁▁▁▁

drizzle                        7.32 ms/iter   7.53 ms    ▂           █▇
                        (6.72 ms … 8.82 ms)   7.71 ms    █          ▆███
                    (599.54 kb …   4.09 mb)   1.62 mb ▂▂▄█▇▇▅▁▅▂▁▁▁▂█████▄▂

drizzle:p                      6.48 ms/iter   6.72 ms                 ▇█
                        (5.17 ms … 7.12 ms)   7.00 ms          ▄▇     ██▃
                    (194.68 kb … 975.01 kb) 417.56 kb ▂▁▁▁▁▁▁▁▃██▆▂▂▁▆███▃▃

knex                           3.83 ms/iter   3.95 ms   ▆     ▅█
                        (3.54 ms … 5.61 ms)   4.44 ms  ██▇    ██▄
                    (225.22 kb …   1.67 mb) 805.52 kb ▃████▂▃▇███▇▆▃▁▁▂▂▁▁▂

kysely                         3.79 ms/iter   3.81 ms      ▃▃▇ ▂▆█▃
                        (3.70 ms … 3.96 ms)   3.89 ms     ▆███▅█████
                    (518.52 kb … 546.32 kb) 522.28 kb ▃▂▆▇██████████▇▆█▃▃▂▂

mikro                          4.82 ms/iter   4.86 ms        ▇▆█
                        (4.31 ms … 5.72 ms)   5.49 ms        ███▂
                    (141.22 kb …   4.38 mb)   2.22 mb ▂▂▂▂▂▂▇████▆▂▂▁▂▂▁▁▂▂

typeorm                        4.34 ms/iter   4.38 ms   ▃█▅
                        (4.20 ms … 5.13 ms)   4.87 ms  ▇███▇
                    (876.98 kb …   2.84 mb)   1.35 mb ▅███████▄▄▃▂▁▂▁▁▂▁▁▁▂

prisma                         4.65 ms/iter   4.66 ms  ▃█▆
                        (4.50 ms … 5.81 ms)   5.65 ms  ███
                    (  1.16 mb …   2.94 mb)   1.41 mb ▃███▇▃▂▁▁▁▁▁▁▁▁▂▁▁▁▁▂

summary
  pg:p
   1.07x faster than pg
   1.15x faster than kysely
   1.17x faster than knex
   1.32x faster than typeorm
   1.42x faster than prisma
   1.47x faster than mikro
   1.97x faster than drizzle:p
   2.23x faster than drizzle

• SELECT * FROM product
------------------------------------------- -------------------------------
pg                           196.03 µs/iter 195.58 µs            ██
                      (153.46 µs … 3.28 ms) 219.50 µs           ████
                    ( 56.88 kb … 280.88 kb)  57.22 kb ▁▁▁▁▁▁▁▁▂▇█████▅▃▂▁▁▁

pg:p                         189.25 µs/iter 189.50 µs          ▃▆█▆
                      (160.71 µs … 3.36 ms) 208.04 µs        ▃▆████▆
                    ( 57.72 kb … 281.72 kb)  58.09 kb ▁▁▂▃▅▇█████████▅▃▃▂▁▁

drizzle                      246.83 µs/iter 244.83 µs    ▂█▅
                      (221.88 µs … 1.80 ms) 306.17 µs    ███▄
                    (  2.17 kb …   1.12 mb) 161.81 kb ▁▂█████▆▃▂▂▁▁▁▁▁▁▁▁▁▁

drizzle:p                    224.80 µs/iter 223.42 µs      ▇█▄
                      (203.79 µs … 1.86 ms) 253.88 µs     ▇███▆
                    (  7.27 kb … 811.36 kb) 123.06 kb ▁▂▄███████▇▅▃▂▂▁▁▁▁▁▁

knex                         204.51 µs/iter 202.63 µs          █▃
                      (162.25 µs … 3.31 ms) 237.42 µs         ▇██▃
                    ( 39.40 kb … 452.84 kb)  72.51 kb ▁▁▁▁▁▁▂▄████▆▄▃▂▂▁▂▁▁

kysely                       200.07 µs/iter 198.67 µs       ▅█▆▅
                      (178.50 µs … 3.20 ms) 220.00 µs      ▇████▇▂
                    ( 63.30 kb … 383.67 kb)  64.06 kb ▁▁▂▄████████▆▅▄▃▂▂▂▁▁

mikro                        680.56 µs/iter 658.67 µs █▅
                      (501.21 µs … 3.64 ms)   3.15 ms ██
                    (  8.59 kb …   2.28 mb) 828.58 kb ██▄▂▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

typeorm                      257.17 µs/iter 255.63 µs    █▅
                      (210.54 µs … 1.55 ms) 402.67 µs    ██▃
                    ( 62.09 kb …   1.21 mb) 186.20 kb ▁▁████▄▃▂▂▂▁▁▁▁▁▁▁▁▁▁

prisma                       275.67 µs/iter 269.04 µs   █
                      (238.92 µs … 2.68 ms) 468.00 µs   █
                    ( 12.54 kb … 844.31 kb) 163.57 kb ▂███▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

summary
  pg:p
   1.04x faster than pg
   1.06x faster than kysely
   1.08x faster than knex
   1.19x faster than drizzle:p
   1.3x faster than drizzle
   1.36x faster than typeorm
   1.46x faster than prisma
   3.6x faster than mikro

• SELECT * FROM product LEFT JOIN supplier WHERE product.id = ?
------------------------------------------- -------------------------------
pg                            12.45 ms/iter  11.98 ms █
                      (11.77 ms … 23.85 ms)  20.65 ms █
                    (  1.04 mb …   1.05 mb)   1.04 mb █▅▁▂▂▁▁▁▁▂▁▁▁▁▁▁▁▁▁▁▂

pg:p                           9.51 ms/iter   9.65 ms                   █
                       (7.20 ms … 10.00 ms)   9.83 ms                   █▅
                    (  1.01 mb …   2.24 mb)   1.03 mb ▂▁▂▁▁▁▁▁▂▁▂▁▁▂▁▁▂▃██▃

drizzle                       25.52 ms/iter  25.97 ms   █
                      (25.01 ms … 26.58 ms)  26.54 ms   █▅         ▅
                    (  7.37 mb …   8.75 mb)   8.07 mb ████▅█▁▁▁▁▁▅▁█▁▅▁▁▅▁▅

drizzle:p                     18.88 ms/iter  18.83 ms   █
                      (18.56 ms … 20.38 ms)  20.33 ms  ███
                    (  1.33 mb …   1.92 mb)   1.37 mb ████▃▃▁▁▁▁▁▃▁▃▁▁▁▁▁▁▃

knex                          13.10 ms/iter  13.03 ms    █▄
                      (12.70 ms … 17.59 ms)  14.21 ms   ▇██
                    (  2.70 mb …   3.76 mb)   3.23 mb ▆▅███▆█▁▁▃▃▁▁▁▁▃▁▁▁▁▃

kysely                        13.22 ms/iter  13.28 ms           █▃
                      (12.32 ms … 20.96 ms)  14.03 ms ▃█       ▃██
                    (868.96 kb …   3.51 mb)   2.15 mb ██▄▁▁▁▁▆██████▁▁▁▄▁▄▄

mikro                         18.61 ms/iter  18.78 ms    █  █▂▂ █   ▂
                      (17.82 ms … 19.88 ms)  19.67 ms ▅  █▅ ███▅█   █
                    ( 12.25 mb …  14.45 mb)  14.06 mb █▁▁██▇█████▇▇▁█▇▇▁▁▁▇

typeorm                       29.65 ms/iter  30.13 ms      █
                      (28.66 ms … 31.05 ms)  30.80 ms   ██ █ █        █   █
                    ( 10.76 mb …  12.33 mb)  11.24 mb █▁██▁███▁▁███▁█▁█▁▁▁█

prisma                        23.88 ms/iter  23.95 ms    █ ▃
                      (23.57 ms … 24.57 ms)  24.49 ms    █▇█ ▂▂    ▂
                    (  5.88 mb …   7.84 mb)   6.89 mb ▆▆▆███▁██▆▁▁▁█▆▁▁▁▁▁▆

summary
  pg:p
   1.31x faster than pg
   1.38x faster than knex
   1.39x faster than kysely
   1.96x faster than mikro
   1.99x faster than drizzle:p
   2.51x faster than prisma
   2.68x faster than drizzle
   3.12x faster than typeorm

• SELECT * FROM product WHERE product.name ILIKE ?
------------------------------------------- -------------------------------
pg                             8.17 ms/iter   8.42 ms  █▅
                       (7.83 ms … 11.31 ms)   8.96 ms  ██
                    (659.21 kb … 665.23 kb) 659.74 kb ▆███▂▂▂▁▁▁▅▇▄▁▂▂▁▂▄▅▂

pg:p                           6.93 ms/iter   7.03 ms                  █
                        (6.45 ms … 7.12 ms)   7.11 ms                ▆▆█▆
                    (637.87 kb … 644.01 kb) 638.26 kb ▅▂▅▄▄▂▁▁▁▁▁▁▁▁▆█████▆

drizzle                       15.55 ms/iter  15.35 ms  █
                      (14.93 ms … 19.61 ms)  18.69 ms  █▄
                    (  2.22 mb …   4.16 mb)   2.95 mb ███▆▁▁▁▁▁▂▄▁▁▁▁▁▁▂▁▁▂

drizzle:p                     13.52 ms/iter  13.93 ms                █
                      (12.58 ms … 15.37 ms)  14.22 ms    █           ███
                    (  1.02 mb …   3.19 mb)   1.13 mb ▇▃▇█▅▁▁▃▁▃▁▁▁▃▁███▅▁▃

knex                           8.75 ms/iter   8.78 ms        ▅█▇
                        (8.31 ms … 9.97 ms)   9.32 ms        ███▅
                    (340.72 kb …   2.50 mb)   1.43 mb ▄▁▁▁▁▅██████▁▁▁▁▁▁▁▂▂

kysely                         8.63 ms/iter   8.70 ms           ▄█▂
                        (8.13 ms … 9.05 ms)   9.04 ms           ███
                    (  1.01 mb …   1.04 mb)   1.01 mb ▂▂▅▂▁▁▁▁▁▆███▇▇▆▂▁▁▂▂

mikro                         11.44 ms/iter  11.56 ms  █ █▄▄█  ▄
                      (11.09 ms … 12.34 ms)  12.17 ms ██▅█████▅█
                    (  3.00 mb …   9.57 mb)   6.35 mb ███████████▁▅▁▁█▁▅▁▅█

typeorm                        9.79 ms/iter   9.81 ms   ▅█
                       (9.55 ms … 10.94 ms)  10.86 ms  ▅███
                    (  2.32 mb …   2.95 mb)   2.65 mb ▄████▆▅▁▁▄▂▁▁▁▁▁▁▁▁▁▂

prisma                         9.96 ms/iter   9.96 ms  █▇
                       (9.79 ms … 11.61 ms)  11.07 ms  ███
                    (  1.81 mb …   4.86 mb)   2.36 mb ▇███▃▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁▂

summary
  pg:p
   1.18x faster than pg
   1.25x faster than kysely
   1.26x faster than knex
   1.41x faster than typeorm
   1.44x faster than prisma
   1.65x faster than mikro
   1.95x faster than drizzle:p
   2.24x faster than drizzle

• select all order with sum and count
------------------------------------------- -------------------------------
pg                             1.93 ms/iter   2.25 ms █▆
                        (1.32 ms … 6.31 ms)   4.39 ms ██ ▂
                    (194.91 kb …   1.45 mb) 884.39 kb ████▆█▆▂█▂▁▅▃▂▂▂▂▁▁▁▁

pg:p                           2.98 ms/iter   3.30 ms  ▄  ▂  █ ▂▃
                       (1.82 ms … 12.64 ms)   4.58 ms  █ ▄██▄████▄ ▅
                    (884.45 kb … 964.91 kb) 885.58 kb ▄███████████████▄▁▂▃▄

drizzle                        4.16 ms/iter   4.96 ms      █      ▅█
                        (2.26 ms … 6.68 ms)   6.45 ms  █▇ ▄██ ▇▂█ ██▂▂
                    (340.66 kb …   3.21 mb)   1.30 mb ▄██▅███████▆██████▂▆▄

drizzle:p                      4.57 ms/iter   5.05 ms         █
                       (2.67 ms … 11.17 ms)   7.72 ms   ▆▄█  ▂██
                    (509.64 kb …   2.69 mb)   1.24 mb ▂▆███▃██████▅▇▂▄▂▁▁▃▂

knex                           3.25 ms/iter   3.47 ms       █ ▆
                       (2.14 ms … 13.19 ms)   5.14 ms    ▄▅ █▅█▃▇
                    (919.74 kb …   1.08 mb) 921.98 kb ▄▇▄██▇█████▇▆▂▁▁▁▁▁▂▂

kysely                         3.20 ms/iter   3.55 ms   █
                       (2.29 ms … 10.55 ms)   5.21 ms   █     ▂
                    (593.62 kb … 991.99 kb) 901.52 kb ▄▄██▄▆▂▅█▆▆▃▂▃▂▃▁▁▁▁▁

mikro                         33.65 ms/iter  34.85 ms                 █
                      (28.90 ms … 41.22 ms)  36.37 ms █         █     █ █
                    (752.13 kb …  43.03 mb)  10.50 mb █▁█▁▁▁▁▁███▁██▁██▁█▁█

typeorm                       10.45 ms/iter  10.68 ms        █
                       (9.62 ms … 11.65 ms)  11.42 ms       ▃██▃ █
                    (  9.92 mb …  13.10 mb)  11.57 mb ▅▇▁▅▅▁████▅██▃█▇▁▁▃▅▃

prisma                         9.06 ms/iter   9.08 ms  █▂
                       (6.92 ms … 20.79 ms)  19.91 ms ▃██
                    (  7.13 mb …   9.40 mb)   8.18 mb ███▅▂▃▁▆▅▃▁▁▂▁▁▁▁▂▁▁▂

summary
  pg
   1.54x faster than pg:p
   1.65x faster than kysely
   1.68x faster than knex
   2.15x faster than drizzle
   2.36x faster than drizzle:p
   4.69x faster than prisma
   5.4x faster than typeorm
   17.41x faster than mikro

• select order with sum and count using limit with offset
------------------------------------------- -------------------------------
pg                            23.46 ms/iter  25.01 ms                   █
                      (19.91 ms … 25.52 ms)  25.47 ms ▃                 █▃
                    (  1.01 mb …   1.02 mb)   1.01 mb █▆▁▄▁▁▄▄▁▁▁▁▁▁▄▁▄▄██▄

pg:p                          23.41 ms/iter  24.00 ms                 █
                      (19.66 ms … 24.88 ms)  24.76 ms                 █▃
                    (  1.00 mb …   1.00 mb)   1.00 mb ▄▁▁▄▁▄▁▄▁▄▁▁▁▁▁███▆▁█

drizzle                       29.85 ms/iter  35.31 ms █
                      (24.19 ms … 39.16 ms)  37.88 ms █▂▂     ▂       ▂  ▂
                    (  1.07 mb …   5.68 mb)   2.59 mb ███▁▁▆▁▆█▁▁▁▁▁▁▁█▁▆█▆

drizle:p                      26.42 ms/iter  29.15 ms ██
                      (22.92 ms … 32.17 ms)  32.00 ms ██       ▂        ▂ ▂
                    (  1.41 mb …   3.05 mb)   1.49 mb ██▆▁▁▁▆▆▁█▁▆▁▁▆▁▆▁█▁█

knex                          27.43 ms/iter  29.60 ms               █  █
                      (20.92 ms … 32.10 ms)  31.55 ms █          █  █  █
                    (  1.66 mb …   1.71 mb)   1.67 mb █▁▁▁▁██▁██████████▁██

kysely                        26.48 ms/iter  27.48 ms           █ ██
                      (21.99 ms … 30.14 ms)  29.92 ms   █       █████
                    (506.30 kb …   2.20 mb)   1.34 mb █▁█▁██▁▁▁▁██████▁█▁██

mikro                        131.93 ms/iter 133.54 ms █     █
                    (125.80 ms … 145.24 ms) 139.38 ms █  ▅▅▅█ ▅  ▅    ▅   ▅
                    ( 25.57 mb …  30.25 mb)  27.68 mb █▁▁████▁█▁▁█▁▁▁▁█▁▁▁█

typeorm                       49.52 ms/iter  53.13 ms █  ██  ██ █ █ █ █   █
                      (39.09 ms … 59.91 ms)  59.22 ms █  ██  ██ █ █ █ █   █
                    ( 14.09 mb …  14.91 mb)  14.27 mb █▁▁██▁▁██▁█▁█▁█▁█▁▁▁█

prisma                        38.69 ms/iter  45.67 ms █       █           █
                      (27.36 ms … 50.03 ms)  48.33 ms █ ▅▅    █▅▅▅  ▅  ▅ ▅█
                    (  9.23 mb …   9.27 mb)   9.25 mb █▁██▁▁▁▁████▁▁█▁▁█▁██

summary
  pg:p
   1x faster than pg
   1.13x faster than drizle:p
   1.13x faster than kysely
   1.17x faster than knex
   1.27x faster than drizzle
   1.65x faster than prisma
   2.12x faster than typeorm
   5.64x faster than mikro

• select order where order.id = ? with sum and count
------------------------------------------- -------------------------------
pg                            10.66 ms/iter  11.02 ms   █
                       (9.75 ms … 13.39 ms)  13.21 ms   █   ▂▄
                    (  2.05 mb …   2.08 mb)   2.06 mb █▇███▃██▄▄▆▃▁▆▃▁▁▁▁▁▃

pg:p                           8.92 ms/iter   9.02 ms     █
                       (8.31 ms … 12.92 ms)  10.41 ms  ██▅██▃▆
                    (  1.70 mb …   2.19 mb)   1.94 mb █████████▇▃▅▃▃▁▁▁▁▃▃▃

drizzle                       25.69 ms/iter  26.35 ms █    ██ █ ██   █
                      (23.93 ms … 27.96 ms)  27.95 ms █▅▅▅▅██ █ ██▅▅ █▅   ▅
                    ( 14.21 mb …  16.27 mb)  14.71 mb ███████▁█▁████▁██▁▁▁█

drizzle:p                     19.28 ms/iter  20.15 ms  ▃█
                      (17.62 ms … 23.02 ms)  22.02 ms ▂██ ▇  ▂▇   ▂  ▂   ▂
                    (  2.58 mb …   3.07 mb)   2.69 mb ███▆█▆▆██▆▆▁█▁▁█▁▆▁█▆

knex                          13.70 ms/iter  13.86 ms        ▅ █
                      (12.86 ms … 15.10 ms)  14.83 ms   ▃▃▆ ▃█ █▆
                    (  9.23 mb …   9.88 mb)   9.62 mb ▄▄█████████▄▄▄▁█▄▁█▄▄

kysely                        15.84 ms/iter  16.38 ms     ▄          █
                      (14.84 ms … 17.70 ms)  16.94 ms   ▅ █    ▅     █
                    (  5.55 mb …   5.92 mb)   5.83 mb █████▅▅▁██▅█▅▅██▅▅▅▅▅

mikro                         44.19 ms/iter  46.30 ms   █
                      (40.05 ms … 50.30 ms)  49.38 ms ▅ █▅▅▅▅    ▅ ▅    ▅ ▅
                    (  1.10 mb …   7.43 mb)   4.14 mb █▁█████▁▁▁▁█▁█▁▁▁▁█▁█

prisma                        28.21 ms/iter  29.10 ms        █
                      (26.32 ms … 30.65 ms)  30.35 ms █  █  ██  █  ██
                    ( 17.73 mb …  18.23 mb)  17.90 mb █▁██▁▁███▁█▁▁██▁█▁█▁█

typeorm                       34.69 ms/iter  35.13 ms      █   █ ██
                      (33.26 ms … 36.50 ms)  36.37 ms ▅▅▅▅ █   █ ██▅▅     ▅
                    ( 28.03 mb …  32.92 mb)  29.20 mb ████▁█▁▁▁█▁████▁▁▁▁▁█

summary
  pg:p
   1.2x faster than pg
   1.54x faster than knex
   1.78x faster than kysely
   2.16x faster than drizzle:p
   2.88x faster than drizzle
   3.16x faster than prisma
   3.89x faster than typeorm
   4.96x faster than mikro

• SELECT * FROM order_detail WHERE order_id = ?
------------------------------------------- -------------------------------
pg                            55.53 ms/iter  56.68 ms ████    █    ██     █
                      (53.18 ms … 59.62 ms)  58.05 ms ████    █    ██     █
                    (  4.37 mb …   4.39 mb)   4.38 mb ████▁▁▁▁█▁▁▁▁██▁▁▁▁▁█

pg:p                          38.92 ms/iter  38.97 ms    █
                      (38.77 ms … 39.21 ms)  39.14 ms  █ █  █    █
                    (  4.40 mb …   4.41 mb)   4.40 mb ██▁█▁██▁▁▁▁█▁▁█▁▁▁▁▁█

drizzle                      110.49 ms/iter 112.73 ms  █         █
                     (99.63 ms … 136.57 ms) 119.25 ms ▅█▅     ▅ ▅█ ▅    ▅ ▅
                    ( 29.62 mb …  29.77 mb)  29.71 mb ███▁▁▁▁▁█▁██▁█▁▁▁▁█▁█

drizzle:p                    112.91 ms/iter 119.75 ms █
                     (99.17 ms … 131.08 ms) 130.73 ms █
                    (  5.64 mb …   5.87 mb)   5.74 mb █▁██▁▁▁██▁▁▁██▁▁▁▁█▁█

knex                          79.20 ms/iter  82.26 ms  █
                     (66.22 ms … 106.16 ms) 105.36 ms ██
                    ( 12.25 mb …  12.51 mb)  12.38 mb ██▁▁█▁███▁▁▁█▁▁▁▁▁▁▁█

kysely                        91.42 ms/iter 104.84 ms                     █
                     (68.70 ms … 105.10 ms) 104.97 ms                     █
                    (  8.33 mb …   8.42 mb)   8.37 mb ██▁▁▁███▁▁▁▁▁▁▁█▁█▁██

mikro                        643.41 ms/iter 678.43 ms                  █
                    (478.93 ms … 716.24 ms) 684.01 ms                 ██ ██
                    ( 17.51 mb …  17.94 mb)  17.71 mb █▁▁▁▁▁▁▁▁▁█▁▁▁▁▁██▁██

typeorm                       79.66 ms/iter  79.02 ms     █
                      (75.21 ms … 91.42 ms)  86.39 ms    ██ █
                    ( 29.53 mb …  32.59 mb)  31.04 mb █▁▁██▁██▁█▁▁▁▁▁▁▁▁▁▁█

prisma                        96.80 ms/iter  96.38 ms         █
                     (91.06 ms … 109.61 ms) 101.99 ms       █ █ █
                    ( 23.64 mb …  23.65 mb)  23.65 mb █▁▁▁▁▁█████▁▁▁▁▁▁▁▁▁█

summary
  pg:p
   1.43x faster than pg
   2.04x faster than knex
   2.05x faster than typeorm
   2.35x faster than kysely
   2.49x faster than prisma
   2.84x faster than drizzle
   2.9x faster than drizzle:p
   16.53x faster than mikro
```
