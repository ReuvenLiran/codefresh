import { Component, OnInit } from '@angular/core';
import { getLog } from './utils';

const STAGE1 = {
  stage: 'DEFAULT',
  steps: [],
  isFinal: false,
};
const STAGE2 = {
  stage: 'BUILD&TEST',
  steps: [],
  isFinal: false,
};
const STAGE3 = {
  stage: 'RELEASE',
  steps: [],
  isFinal: true,
};

const LOGS = [
  "Evaluating execution condition \u001b[01;33mskip\u001b[0m \u001b[00;33m( '${{CF_SKIP_MAIN_CLONE}}' != 'true' )\u001b[0m: it evaluates to \u001b[01;32mtrue\u001b[0m\r\n",
  "\u001b[00;32mContinuing execution.\u001b[0m\r\n",
  "Running git-clone step: Cloning main repository...\r\n",
  "Using default git context\r\n",
  "Using git context: CF-default\r\n",
  "cloning https://github.com/codefresh-io/venona.git\r\nCloning into 'venona'...\r\n",
  "remote: Enumerating objects: 1891, done.\u001b[K\r\nremote: Counting objects:   0% (1/1891)   \u001b[K\rremote: Counting objects:   1% (19/1891)   \u001b[K\rremote: Counting objects:   2% (38/1891)   \u001b[K\rremote: Counting objects:   3% (57/1891)   \u001b[K\rremote: Counting objects:   4% (76/1891)   \u001b[K\rremote: Counting objects:   5% (95/1891)   \u001b[K\rremote: Counting objects:   6% (114/1891)   \u001b[K\rremote: Counting objects:   7% (133/1891)   \u001b[K\rremote: Counting objects:   8% (152/1891)   \u001b[K\rremote: Counting objects:   9% (171/1891)   \u001b[K\rremote: Counting objects:  10% (190/1891)   \u001b[K\r",
  "remote: Counting objects:  11% (209/1891)   \u001b[K\rremote: Counting objects:  12% (227/1891)   \u001b[K\rremote: Counting objects:  13% (246/1891)   \u001b[K\rremote: Counting objects:  14% (265/1891)   \u001b[K\rremote: Counting objects:  15% (284/1891)   \u001b[K\rremote: Counting objects:  16% (303/1891)   \u001b[K\rremote: Counting objects:  17% (322/1891)   \u001b[K\rremote: Counting objects:  18% (341/1891)   \u001b[K\rremote: Counting objects:  19% (360/1891)   \u001b[K\rremote: Counting objects:  20% (379/1891)   \u001b[K\rremote: Counting objects:  21% (398/1891)   \u001b[K\rremote: Counting objects:  22% (417/1891)   \u001b[K\rremote: Counting objects:  23% (435/1891)   \u001b[K\rremote: Counting objects:  24% (454/1891)   \u001b[K\rremote: Counting objects:  25% (473/1891)   \u001b[K\rremote: Counting objects:  26% (492/1891)   \u001b[K\rremote: Counting objects:  27% (511/1891)   \u001b[K\rremote: Counting objects:  28% (530/1891)   \u001b[K\rremote: Counting objects:  29% (549/1891)   \u001b[K\rremote: Counting objects:  30% (568/1891)   \u001b[K\rremote: Counting objects:  31% (587/1891)   \u001b[K\rremote: Counting objects:  32% (606/1891)   \u001b[K\rremote: Counting objects:  33% (625/1891)   \u001b[K\rremote: Counting objects:  34% (643/1891)   \u001b[K\rremote: Counting objects:  35% (662/1891)   \u001b[K\rremote: Counting objects:  36% (681/1891)   \u001b[K\rremote: Counting objects:  37% (700/1891)   \u001b[K\rremote: Counting objects:  38% (719/1891)   \u001b[K\rremote: Counting objects:  39% (738/1891)   \u001b[K\rremote: Counting objects:  40% (757/1891)   \u001b[K\rremote: Counting objects:  41% (776/1891)   \u001b[K\rremote: Counting objects:  42% (795/1891)   \u001b[K\rremote: Counting objects:  43% (814/1891)   \u001b[K\rremote: Counting objects:  44% (833/1891)   \u001b[K\rremote: Counting objects:  45% (851/1891)   \u001b[K\rremote: Counting objects:  46% (870/1891)   \u001b[K\rremote: Counting objects:  47% (889/1891)   \u001b[K\rremote: Counting objects:  48% (908/1891)   \u001b[K\rremote: Counting objects:  49% (927/1891)   \u001b[K\rremote: Counting objects:  50% (946/1891)   \u001b[K\rremote: Counting objects:  51% (965/1891)   \u001b[K\rremote: Counting objects:  52% (984/1891)   \u001b[K\rremote: Counting objects:  53% (1003/1891)   \u001b[K\rremote: Counting objects:  54% (1022/1891)   \u001b[K\rremote: Counting objects:  55% (1041/1891)   \u001b[K\rremote: Counting objects:  56% (1059/1891)   \u001b[K\rremote: Counting objects:  57% (1078/1891)   \u001b[K\rremote: Counting objects:  58% (1097/1891)   \u001b[K\rremote: Counting objects:  59% (1116/1891)   \u001b[K\rremote: Counting objects:  60% (1135/1891)   \u001b[K\rremote: Counting objects:  61% (1154/1891)   \u001b[K\rremote: Counting objects:  62% (1173/1891)   \u001b[K\rremote: Counting objects:  63% (1192/1891)   \u001b[K\rremote: Counting objects:  64% (1211/1891)   \u001b[K\rremote: Counting objects:  65% (1230/1891)   \u001b[K\rremote: Counting objects:  66% (1249/1891)   \u001b[K\rremote: Counting objects:  67% (1267/1891)   \u001b[K\rremote: Counting objects:  68% (1286/1891)   \u001b[K\rremote: Counting objects:  69% (1305/1891)   \u001b[K\r",
  "remote: Counting objects:  70% (1324/1891)   \u001b[K\rremote: Counting objects:  71% (1343/1891)   \u001b[K\rremote: Counting objects:  72% (1362/1891)   \u001b[K\rremote: Counting objects:  73% (1381/1891)   \u001b[K\rremote: Counting objects:  74% (1400/1891)   \u001b[K\rremote: Counting objects:  75% (1419/1891)   \u001b[K\rremote: Counting objects:  76% (1438/1891)   \u001b[K\rremote: Counting objects:  77% (1457/1891)   \u001b[K\rremote: Counting objects:  78% (1475/1891)   \u001b[K\rremote: Counting objects:  79% (1494/1891)   \u001b[K\rremote: Counting objects:  80% (1513/1891)   \u001b[K\rremote: Counting objects:  81% (1532/1891)   \u001b[K\rremote: Counting objects:  82% (1551/1891)   \u001b[K\rremote: Counting objects:  83% (1570/1891)   \u001b[K\rremote: Counting objects:  84% (1589/1891)   \u001b[K\rremote: Counting objects:  85% (1608/1891)   \u001b[K\rremote: Counting objects:  86% (1627/1891)   \u001b[K\rremote: Counting objects:  87% (1646/1891)   \u001b[K\rremote: Counting objects:  88% (1665/1891)   \u001b[K\rremote: Counting objects:  89% (1683/1891)   \u001b[K\rremote: Counting objects:  90% (1702/1891)   \u001b[K\rremote: Counting objects:  91% (1721/1891)   \u001b[K\rremote: Counting objects:  92% (1740/1891)   \u001b[K\rremote: Counting objects:  93% (1759/1891)   \u001b[K\rremote: Counting objects:  94% (1778/1891)   \u001b[K\rremote: Counting objects:  95% (1797/1891)   \u001b[K\rremote: Counting objects:  96% (1816/1891)   \u001b[K\rremote: Counting objects:  97% (1835/1891)   \u001b[K\rremote: Counting objects:  98% (1854/1891)   \u001b[K\rremote: Counting objects:  99% (1873/1891)   \u001b[K\rremote: Counting objects: 100% (1891/1891)   \u001b[K\rremote: Counting objects: 100% (1891/1891), done.\u001b[K\r\nremote: Compressing objects:   0% (1/1006)   \u001b[K\rremote: Compressing objects:   1% (11/1006)   \u001b[K\rremote: Compressing objects:   2% (21/1006)   \u001b[K\rremote: Compressing objects:   3% (31/1006)   \u001b[K\rremote: Compressing objects:   4% (41/1006)   \u001b[K\rremote: Compressing objects:   5% (51/1006)   \u001b[K\rremote: Compressing objects:   6% (61/1006)   \u001b[K\rremote: Compressing objects:   7% (71/1006)   \u001b[K\rremote: Compressing objects:   8% (81/1006)   \u001b[K\rremote: Compressing objects:   9% (91/1006)   \u001b[K\rremote: Compressing objects:  10% (101/1006)   \u001b[K\rremote: Compressing objects:  11% (111/1006)   \u001b[K\r",
  "remote: Compressing objects:  12% (121/1006)   \u001b[K\rremote: Compressing objects:  13% (131/1006)   \u001b[K\r",
  "remote: Compressing objects:  14% (141/1006)   \u001b[K\r",
  "remote: Compressing objects:  15% (151/1006)   \u001b[K\rremote: Compressing objects:  16% (161/1006)   \u001b[K\r",
  "remote: Compressing objects:  17% (172/1006)   \u001b[K\rremote: Compressing objects:  18% (182/1006)   \u001b[K\r",
  "remote: Compressing objects:  19% (192/1006)   \u001b[K\rremote: Compressing objects:  20% (202/1006)   \u001b[K\rremote: Compressing objects:  21% (212/1006)   \u001b[K\r",
  "remote: Compressing objects:  22% (222/1006)   \u001b[K\rremote: Compressing objects:  23% (232/1006)   \u001b[K\rremote: Compressing objects:  24% (242/1006)   \u001b[K\rremote: Compressing objects:  25% (252/1006)   \u001b[K\rremote: Compressing objects:  26% (262/1006)   \u001b[K\rremote: Compressing objects:  27% (272/1006)   \u001b[K\rremote: Compressing objects:  28% (282/1006)   \u001b[K\rremote: Compressing objects:  29% (292/1006)   \u001b[K\rremote: Compressing objects:  30% (302/1006)   \u001b[K\rremote: Compressing objects:  31% (312/1006)   \u001b[K\rremote: Compressing objects:  32% (322/1006)   \u001b[K\rremote: Compressing objects:  33% (332/1006)   \u001b[K\rremote: Compressing objects:  34% (343/1006)   \u001b[K\rremote: Compressing objects:  35% (353/1006)   \u001b[K\rremote: Compressing objects:  36% (363/1006)   \u001b[K\r",
  "remote: Compressing objects:  37% (373/1006)   \u001b[K\r",
  "remote: Compressing objects:  38% (383/1006)   \u001b[K\r",
  "remote: Compressing objects:  39% (393/1006)   \u001b[K\r",
  "remote: Compressing objects:  40% (403/1006)   \u001b[K\rremote: Compressing objects:  41% (413/1006)   \u001b[K\r",
  "remote: Compressing objects:  42% (423/1006)   \u001b[K\rremote: Compressing objects:  43% (433/1006)   \u001b[K\rremote: Compressing objects:  44% (443/1006)   \u001b[K\rremote: Compressing objects:  45% (453/1006)   \u001b[K\rremote: Compressing objects:  46% (463/1006)   \u001b[K\rremote: Compressing objects:  47% (473/1006)   \u001b[K\rremote: Compressing objects:  48% (483/1006)   \u001b[K\rremote: Compressing objects:  49% (493/1006)   \u001b[K\rremote: Compressing objects:  50% (503/1006)   \u001b[K\rremote: Compressing objects:  51% (514/1006)   \u001b[K\rremote: Compressing objects:  52% (524/1006)   \u001b[K\rremote: Compressing objects:  53% (534/1006)   \u001b[K\rremote: Compressing objects:  54% (544/1006)   \u001b[K\rremote: Compressing objects:  55% (554/1006)   \u001b[K\rremote: Compressing objects:  56% (564/1006)   \u001b[K\rremote: Compressing objects:  57% (574/1006)   \u001b[K\rremote: Compressing objects:  58% (584/1006)   \u001b[K\r",
  "remote: Compressing objects:  59% (594/1006)   \u001b[K\r",
  "remote: Compressing objects:  60% (604/1006)   \u001b[K\rremote: Compressing objects:  61% (614/1006)   \u001b[K\rremote: Compressing objects:  62% (624/1006)   \u001b[K\rremote: Compressing objects:  63% (634/1006)   \u001b[K\rremote: Compressing objects:  64% (644/1006)   \u001b[K\rremote: Compressing objects:  65% (654/1006)   \u001b[K\rremote: Compressing objects:  66% (664/1006)   \u001b[K\rremote: Compressing objects:  67% (675/1006)   \u001b[K\rremote: Compressing objects:  68% (685/1006)   \u001b[K\rremote: Compressing objects:  69% (695/1006)   \u001b[K\rremote: Compressing objects:  70% (705/1006)   \u001b[K\rremote: Compressing objects:  71% (715/1006)   \u001b[K\rremote: Compressing objects:  72% (725/1006)   \u001b[K\rremote: Compressing objects:  73% (735/1006)   \u001b[K\rremote: Compressing objects:  74% (745/1006)   \u001b[K\rremote: Compressing objects:  75% (755/1006)   \u001b[K\rremote: Compressing objects:  76% (765/1006)   \u001b[K\rremote: Compressing objects:  77% (775/1006)   \u001b[K\rremote: Compressing objects:  78% (785/1006)   \u001b[K\rremote: Compressing objects:  79% (795/1006)   \u001b[K\rremote: Compressing objects:  80% (805/1006)   \u001b[K\rremote: Compressing objects:  81% (815/1006)   \u001b[K\rremote: Compressing objects:  82% (825/1006)   \u001b[K\rremote: Compressing objects:  83% (835/1006)   \u001b[K\rremote: Compressing objects:  84% (846/1006)   \u001b[K\rremote: Compressing objects:  85% (856/1006)   \u001b[K\rremote: Compressing objects:  86% (866/1006)   \u001b[K\rremote: Compressing objects:  87% (876/1006)   \u001b[K\rremote: Compressing objects:  88% (886/1006)   \u001b[K\rremote: Compressing objects:  89% (896/1006)   \u001b[K\rremote: Compressing objects:  90% (906/1006)   \u001b[K\rremote: Compressing objects:  91% (916/1006)   \u001b[K\rremote: Compressing objects:  92% (926/1006)   \u001b[K\rremote: Compressing objects:  93% (936/1006)   \u001b[K\rremote: Compressing objects:  94% (946/1006)   \u001b[K\rremote: Compressing objects:  95% (956/1006)   \u001b[K\rremote: Compressing objects:  96% (966/1006)   \u001b[K\rremote: Compressing objects:  97% (976/1006)   \u001b[K\rremote: Compressing objects:  98% (986/1006)   \u001b[K\rremote: Compressing objects:  99% (996/1006)   \u001b[K\rremote: Compressing objects: 100% (1006/1006)   \u001b[K\rremote: Compressing objects: 100% (1006/1006), done.\u001b[K\r\n",
  "Receiving objects:   0% (1/5716)   \r",
  "Receiving objects:   1% (58/5716)   \r",
  "Receiving objects:   2% (115/5716)   \r",
  "Receiving objects:   3% (172/5716)   \r",
  "Receiving objects:   4% (229/5716)   \r",
  "Receiving objects:   5% (286/5716)   \r",
  "Receiving objects:   6% (343/5716)   \r",
  "Receiving objects:   7% (401/5716)   \r",
  "Receiving objects:   8% (458/5716)   \r",
  "Receiving objects:   9% (515/5716)   \r",
  "Receiving objects:  10% (572/5716)   \r",
  "Receiving objects:  11% (629/5716)   \r",
  "Receiving objects:  12% (686/5716)   \r",
  "Receiving objects:  13% (744/5716)   \r",
  "Receiving objects:  14% (801/5716)   \r",
  "Receiving objects:  15% (858/5716)   \r",
  "Receiving objects:  16% (915/5716)   \rReceiving objects:  17% (972/5716)   \rReceiving objects:  18% (1029/5716)   \rReceiving objects:  19% (1087/5716)   \rReceiving objects:  20% (1144/5716)   \rReceiving objects:  21% (1201/5716)   \rReceiving objects:  22% (1258/5716)   \rReceiving objects:  23% (1315/5716)   \rReceiving objects:  24% (1372/5716)   \r",
  "Receiving objects:  25% (1429/5716)   \r",
  "Receiving objects:  26% (1487/5716)   \r",
  "Receiving objects:  27% (1544/5716)   \r",
  "Receiving objects:  28% (1601/5716)   \r",
  "Receiving objects:  29% (1658/5716)   \r",
  "Receiving objects:  30% (1715/5716)   \r",
  "Receiving objects:  31% (1772/5716)   \r",
  "Receiving objects:  32% (1830/5716)   \r",
  "Receiving objects:  33% (1887/5716)   \r",
  "Receiving objects:  34% (1944/5716)   \r",
  "Receiving objects:  35% (2001/5716)   \r",
  "Receiving objects:  36% (2058/5716)   \r",
  "Receiving objects:  37% (2115/5716)   \r",
  "Receiving objects:  38% (2173/5716)   \r",
  "Receiving objects:  39% (2230/5716)   \r",
  "Receiving objects:  40% (2287/5716)   \r",
  "Receiving objects:  41% (2344/5716)   \r",
  "Receiving objects:  42% (2401/5716)   \r",
  "Receiving objects:  43% (2458/5716)   \r",
  "Receiving objects:  44% (2516/5716)   \r",
  "Receiving objects:  45% (2573/5716)   \r",
  "Receiving objects:  46% (2630/5716)   \r",
  "Receiving objects:  47% (2687/5716)   \r",
  "Receiving objects:  48% (2744/5716)   \r",
  "Receiving objects:  49% (2801/5716)   \r",
  "Receiving objects:  50% (2858/5716)   \r",
  "Receiving objects:  51% (2916/5716)   \rReceiving objects:  52% (2973/5716)   \r",
  "Receiving objects:  53% (3030/5716)   \r",
  "Receiving objects:  54% (3087/5716)   \r",
  "Receiving objects:  55% (3144/5716)   \r",
  "Receiving objects:  56% (3201/5716)   \r",
  "Receiving objects:  57% (3259/5716)   \rReceiving objects:  58% (3316/5716)   \rReceiving objects:  59% (3373/5716)   \r",
  "Receiving objects:  60% (3430/5716)   \rReceiving objects:  61% (3487/5716)   \rReceiving objects:  62% (3544/5716)   \rReceiving objects:  63% (3602/5716)   \rReceiving objects:  64% (3659/5716)   \rReceiving objects:  65% (3716/5716)   \rReceiving objects:  66% (3773/5716)   \rReceiving objects:  67% (3830/5716)   \rReceiving objects:  68% (3887/5716)   \rReceiving objects:  69% (3945/5716)   \rReceiving objects:  70% (4002/5716)   \rReceiving objects:  71% (4059/5716)   \r",
  "Receiving objects:  72% (4116/5716)   \rReceiving objects:  73% (4173/5716)   \rReceiving objects:  74% (4230/5716)   \r",
  "Receiving objects:  75% (4287/5716)   \r",
  "Receiving objects:  76% (4345/5716)   \r",
  "Receiving objects:  77% (4402/5716)   \r",
  "Receiving objects:  78% (4459/5716)   \r",
  "Receiving objects:  79% (4516/5716)   \r",
  "Receiving objects:  80% (4573/5716)   \r",
  "Receiving objects:  81% (4630/5716)   \r",
  "Receiving objects:  82% (4688/5716)   \r",
  "Receiving objects:  83% (4745/5716)   \r",
  "Receiving objects:  84% (4802/5716)   \r",
  "Receiving objects:  85% (4859/5716)   \r",
  "Receiving objects:  86% (4916/5716)   \r",
  "Receiving objects:  87% (4973/5716)   \r",
  "Receiving objects:  87% (4999/5716), 20.24 MiB | 20.25 MiB/s   \r",
  "Receiving objects:  88% (5031/5716), 20.24 MiB | 20.25 MiB/s   \r",
  "Receiving objects:  89% (5088/5716), 20.24 MiB | 20.25 MiB/s   \r",
  "Receiving objects:  90% (5145/5716), 20.24 MiB | 20.25 MiB/s   \r",
  "Receiving objects:  91% (5202/5716), 20.24 MiB | 20.25 MiB/s   \r",
  "Receiving objects:  92% (5259/5716), 20.24 MiB | 20.25 MiB/s   \r",
  "Receiving objects:  93% (5316/5716), 20.24 MiB | 20.25 MiB/s   \r",
  "Receiving objects:  94% (5374/5716), 20.24 MiB | 20.25 MiB/s   \r",
  "Receiving objects:  95% (5431/5716), 20.24 MiB | 20.25 MiB/s   \r",
  "Receiving objects:  96% (5488/5716), 20.24 MiB | 20.25 MiB/s   \r",
  "Receiving objects:  97% (5545/5716), 20.24 MiB | 20.25 MiB/s   \r",
  "Receiving objects:  98% (5602/5716), 20.24 MiB | 20.25 MiB/s   \r",
  "Receiving objects:  99% (5659/5716), 20.24 MiB | 20.25 MiB/s   \r",
  "remote: Total 5716 (delta 804), reused 1793 (delta 762), pack-reused 3825\u001b[K\r\n",
  "Receiving objects: 100% (5716/5716), 20.24 MiB | 20.25 MiB/s   \rReceiving objects: 100% (5716/5716), 29.82 MiB | 23.24 MiB/s, done.\r\n",
  "Resolving deltas:   0% (0/2025)   \r",
  "Resolving deltas:   1% (27/2025)   \rResolving deltas:   2% (42/2025)   \rResolving deltas:   3% (62/2025)   \rResolving deltas:   4% (86/2025)   \r",
  "Resolving deltas:   5% (105/2025)   \rResolving deltas:   6% (122/2025)   \rResolving deltas:   7% (146/2025)   \rResolving deltas:   8% (164/2025)   \rResolving deltas:   9% (194/2025)   \r",
  "Resolving deltas:  10% (207/2025)   \rResolving deltas:  11% (224/2025)   \rResolving deltas:  12% (247/2025)   \rResolving deltas:  13% (272/2025)   \rResolving deltas:  14% (284/2025)   \rResolving deltas:  15% (305/2025)   \rResolving deltas:  16% (324/2025)   \rResolving deltas:  17% (345/2025)   \r",
  "Resolving deltas:  18% (365/2025)   \r",
  "Resolving deltas:  19% (385/2025)   \r",
  "Resolving deltas:  20% (405/2025)   \r",
  "Resolving deltas:  21% (426/2025)   \rResolving deltas:  22% (446/2025)   \rResolving deltas:  23% (466/2025)   \rResolving deltas:  24% (486/2025)   \rResolving deltas:  25% (507/2025)   \r",
  "Resolving deltas:  26% (527/2025)   \r",
  "Resolving deltas:  27% (548/2025)   \r",
  "Resolving deltas:  28% (567/2025)   \rResolving deltas:  29% (588/2025)   \r",
  "Resolving deltas:  30% (608/2025)   \rResolving deltas:  33% (669/2025)   \r",
  "Resolving deltas:  34% (704/2025)   \r",
  "Resolving deltas:  35% (728/2025)   \r",
  "Resolving deltas:  36% (738/2025)   \r",
  "Resolving deltas:  37% (763/2025)   \rResolving deltas:  38% (771/2025)   \rResolving deltas:  39% (796/2025)   \rResolving deltas:  40% (818/2025)   \r",
  "Resolving deltas:  41% (831/2025)   \rResolving deltas:  42% (851/2025)   \rResolving deltas:  43% (885/2025)   \rResolving deltas:  45% (925/2025)   \rResolving deltas:  46% (935/2025)   \rResolving deltas:  47% (967/2025)   \r",
  "Resolving deltas:  48% (978/2025)   \r",
  "Resolving deltas:  49% (1003/2025)   \r",
  "Resolving deltas:  50% (1013/2025)   \r",
  "Resolving deltas:  51% (1033/2025)   \rResolving deltas:  52% (1053/2025)   \r",
  "Resolving deltas:  53% (1075/2025)   \rResolving deltas:  54% (1094/2025)   \r",
  "Resolving deltas:  55% (1115/2025)   \r",
  "Resolving deltas:  56% (1135/2025)   \r",
  "Resolving deltas:  57% (1155/2025)   \r",
  "Resolving deltas:  58% (1177/2025)   \rResolving deltas:  59% (1196/2025)   \rResolving deltas:  60% (1223/2025)   \rResolving deltas:  61% (1239/2025)   \rResolving deltas:  62% (1258/2025)   \rResolving deltas:  63% (1277/2025)   \rResolving deltas:  64% (1296/2025)   \rResolving deltas:  65% (1317/2025)   \rResolving deltas:  66% (1337/2025)   \r",
  "Resolving deltas:  67% (1372/2025)   \r",
  "Resolving deltas:  68% (1395/2025)   \r",
  "Resolving deltas:  69% (1403/2025)   \r",
  "Resolving deltas:  70% (1425/2025)   \r",
  "Resolving deltas:  71% (1440/2025)   \r",
  "Resolving deltas:  72% (1458/2025)   \r",
  "Resolving deltas:  73% (1482/2025)   \r",
  "Resolving deltas:  74% (1506/2025)   \rResolving deltas:  75% (1533/2025)   \rResolving deltas:  76% (1541/2025)   \r",
  "Resolving deltas:  77% (1570/2025)   \r",
  "Resolving deltas:  78% (1592/2025)   \r",
  "Resolving deltas:  79% (1602/2025)   \rResolving deltas:  80% (1620/2025)   \r",
  "Resolving deltas:  81% (1642/2025)   \r",
  "Resolving deltas:  82% (1662/2025)   \r",
  "Resolving deltas:  83% (1682/2025)   \r",
  "Resolving deltas:  84% (1701/2025)   \r",
  "Resolving deltas:  85% (1722/2025)   \rResolving deltas:  86% (1742/2025)   \rResolving deltas:  91% (1851/2025)   \rResolving deltas:  92% (1866/2025)   \rResolving deltas:  93% (1884/2025)   \rResolving deltas:  94% (1906/2025)   \rResolving deltas:  95% (1932/2025)   \rResolving deltas:  96% (1948/2025)   \rResolving deltas:  97% (1969/2025)   \rResolving deltas:  98% (1986/2025)   \rResolving deltas:  99% (2022/2025)   \r",
  "Resolving deltas: 100% (2025/2025)   \rResolving deltas: 100% (2025/2025), done.\r\n",
  "HEAD is now at e21972e... update readme\r\n",
  "Successfully ran git-clone step: Cloning main repository...\r\n"
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'test1';
  stages = [STAGE1, STAGE2, STAGE3];
  isOpen = false;
  selectedStep = {};
  logs;

  selectStep(id) {
    console.log(id);
    this.selectedStep = id;
    this.isOpen = true;
  }

  closeTerminal() {
    this.isOpen = false;
  }
  
  ngOnInit() {
    this.logs = getLog('a', LOGS);
    const steps = [ {
      name: 'ssss',
      status: 'success',
    // }, { 
    //   name: 'main_clone',
    //   status: 'success',
    // }, {
    //   name: 'aaaaa',
    //   status: 'error',
    // }, {
    //   name: 'bbbbb',
    //   status: 'success',
    // }, {
    //   name: 'ccccc',
    //   status: 'error',
    // }, {
    //   name: 'ssss',
    //   status: 'success',
    // }, { 
    //   name: 'main_clone',
    //   status: 'success',
    // }, {
    //   name: 'aaaaa',
    //   status: 'error',
    // }, {
    //   name: 'bbbbb',
    //   status: 'success',
    }, {
      name: 'ccccc',
      status: 'error',
    }];

    const addStepToStage = (j, i) => {
      setTimeout(() => {
        this.stages[j].steps.push(steps[i])
      }, (i + 1) * 500)
    }
    let j = 0;
    for (let i = 0; i < steps.length; i++) {
      addStepToStage(j, i);
      if (i > 0 && i % 3 === 0) {
        j++;
      }
    }
  }
}
