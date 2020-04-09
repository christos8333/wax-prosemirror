import React, { Fragment } from "react";
import styled, { createGlobalStyle } from "styled-components";

import { EditoriaLayout } from "wax-prosemirror-layouts";
import { Wax } from "wax-prosemirror-core";

import { config } from "./config";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow-y: hidden;
  #root {
    height:100vh;
    width:100vw;
  }
  }
`;

const StyledWax = styled(Wax)`
  .wax-surface-scroll {
    height: ${props => (props.debug ? "50vh" : "100%")};
  }
`;

const renderImage = file => {
  const reader = new FileReader();
  return new Promise((accept, fail) => {
    reader.onload = () => accept(reader.result);
    reader.onerror = () => fail(reader.error);
    // Some extra delay to make the asynchronicity visible
    setTimeout(() => reader.readAsDataURL(file), 150);
  });
};

const user = {
  userId: "1234",
  username: "demo"
};

const Editoria = () => (
  <Fragment>
    <GlobalStyle />
    <StyledWax
      config={config}
      autoFocus
      placeholder="Type Something..."
      fileUpload={file => renderImage(file)}
      value={
        '<p class="paragraph">this is <span class="comment" id="1b87a19d-891c-4329-9482-b8ab8523c129" data-viewid="main" data-conversation="[]">some</span> content wroiwerpoewirewpeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee wereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p><p class="paragraph">fdsfffffffffff<span class="comment" id="30ce7001-3c93-4a4e-8114-51bcc61de491" data-viewid="main" data-conversation="[]">ffffffffffffff</span>fffffffffff<span class="comment" id="68f2f690-eb2c-4f20-b45a-105ace1ad81b" data-viewid="main" data-conversation="[]">fffffffffffffff</span>fffffffffffffffffffffffffffffffffffs fdfdsdfsdfd sf s<span class="comment" id="5b2a6fb3-0dc1-4180-b799-38d7888db341" data-viewid="main" data-conversation="[]">dfsdfsdfs</span>dfsd fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffs ffdsd and wgile res;lfksdf;ldkffsdlkdjfwlekrjw<span class="comment" id="a3e59c3c-e3ef-40ca-afc4-3388fb508c38" data-viewid="main" data-conversation="[]">irewwore eiw</span>urweiusdfoiudsoifu soid<span class="comment" id="63ac2f92-d175-4270-9e5f-e7ad824ca1b2" data-viewid="main" data-conversation="[]"> ufoisdu fso</span>ifusf oisd ufsdoifsufsoif vxlkjvclkjclkj lxkcvj lxkvcj xlkcvj lkx jv  irueworuroe euweoiruweoiufsd oiudfdsodf j sodfiusd fkljflkfjs dsflksj<span class="comment" id="784a0644-6587-410d-a84f-03844bacce54" data-viewid="main" data-conversation="[]">d lksdjf l</span>kdsjlfksdflkdsk</p><p class="paragraph"><span class="comment" id="f6ab4ebf-f31e-477a-b522-744be0688620" data-viewid="main" data-conversation="[]">fs</span></p><p class="paragraph">wrfoufrr opweruorwrupoerweopruweeeeeeeeeeeeeeeeeewpo upodfispoifpozif spofizfposifspofifpdosifsdfsffddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffpodipofsdifposdi fpocccccccccccccccccccx vd dsfsdffsdfs fsdfdsfsfdsffsfdsds dfsfdsfd sfdsdf sdsf sdf sfdf sf sdf fd sfdfdfddsffdsfddffd435345345<footnote id="7129a832-81df-4154-92bc-c0d6ebe8d467">sdfsdfsd fsdfsdfssdddddddddddfds and this is a new test</footnote>3455445frfdfdss fsf sfd f sddf sfd sf fdfs<span class="comment" id="518c4478-b436-4e5c-9f72-2f00a7728757" data-viewid="main" data-conversation="[]">fdsd</span></p><p class="paragraph">fsxs effsp<span class="comment" id="444968fb-7e72-453e-a43c-afea065aeb35" data-viewid="main" data-conversation="[]">fdoifspdfis</span>pofisdfposd if s<span class="comment" id="9c37e3cc-1630-41ea-b77b-5490b0b8f774" data-viewid="main" data-conversation="[]">podfisdfposdi</span>fsddddddddddd<span class="comment" id="a4cbd295-aa62-4aba-a0ee-a89a79ac6b07" data-viewid="main" data-conversation="[]">dddddddddddds ffo</span>pdfis dfpoifsdopfsidfpsodfisdpfodsi ewriwr0e9wer0-9<span class="comment" id="27afcd7b-2272-457c-a41a-8aceff1983a3" data-viewid="main" data-conversation="[]">werwe0-r9we-r0ew9r0-w</span>e9 -sdfpsoifpo sdif sdpofis fpodsi <span class="comment" id="83f91d26-9c4a-4722-85bf-bb90a8d0fb4a" data-viewid="main" data-conversation="[]">sfpofi dsd</span>pofis fpo <span class="comment" id="f8ead8f3-0a10-4cf3-af64-d9e7fa6ddc16" data-viewid="main" data-conversation="[]">sfids pofi posdi p</span>oif spodfi ispofisdpofsdifpo</p><p class="paragraph">fsdfs<span class="comment" id="409c2d5e-5777-493d-a5d5-1039f9b740c9" data-viewid="main" data-conversation="[]">dfsfsfssds</span>d fsd fs</p><p class="paragraph">sfdfsdflk jfdfl<span class="comment" id="2c3194e8-0590-4362-a48b-fd06353edbb6" data-viewid="main" data-conversation="[]">kjflkfj sdlfksdjflskdf</span>jsdlkfsjsldkf<span class="comment" id="e2716f77-2ea0-4ddf-8b7b-fd717a5c96db" data-viewid="main" data-conversation="[]">jslfkjdf ds</span>lkfjdslk<span class="comment" id="b6d89a46-a878-4adf-a8aa-61313a0d8314" data-viewid="main" data-conversation="[]">fsdjfsdlkfjslkfj</span>sdfljeifoejrowi  rjwoif jsdlkfsd jfsdlkf jsdlkfsjfslkfjsdlkfsd jflk<span class="comment" id="031afea0-ebcf-4eb0-9202-b0e57ae06d38" data-viewid="main" data-conversation="[]">sd jfdslkfj lksj</span>fslkfjdlkfjslkfsj flskdjlkf<span class="comment" id="6427578c-d7f0-4e53-a406-05218db6e55c" data-viewid="main" data-conversation="[]">jsflkfjslkdsfj sdlk</span>fsjflksjslkf sjdflk sjsflk<span class="comment" id="d0288d65-5346-49be-ac89-7b4876089a70" data-viewid="main" data-conversation="[]"> j flksfj slkf</span>jsfdlkj slkfj flksjf slkfj sdflk jdxlkjsd fl<span class="comment" id="f93d0ae8-4663-4a5f-ab66-77020b78d951" data-viewid="main" data-conversation="[]">kd jflskdfj lkj</span>xlkvjxlkcvcvjlckj xlkv djlkfjf ldkfkjdslkjf lkdsjf ldksjf slkdf j<span class="comment" id="f4322fb7-1f10-41ae-bf96-c97b227b9b31" data-viewid="main" data-conversation="[]">sdlkf sj</span>fslk jlfks jflksjf sl<span class="comment" id="68a740b3-e6e8-4e33-923d-0a38636ae7df" data-viewid="main" data-conversation="[]">kfj sdlkfj sdsdl</span>kfjfifew jweiojfdsljfsklsjfdlsk fjslkfj slk fj lkdfjs lkfj slkdfj sdlkjcxc lk kjclkcj xlkcx<span class="comment" id="2d17d9ac-3bd5-4e04-a828-e7abab06ae06" data-viewid="main" data-conversation="[]">jc lkjclksj fslkf</span>jflksfdjsd lkjf sldjfslk<span class="comment" id="79505ab8-3ea7-4122-9f9e-475cf5eeca33" data-viewid="main" data-conversation="[]">fsjfl ksjfl</span>k dsjfeirriwroeiruwoiur oifd<span class="comment" id="2a2b3520-30b0-4775-a773-bca473d4001f" data-viewid="main" data-conversation="[]">usouifoiu</span> soidsio</p><p class="paragraph">fddddddddddddd zxx;lssssssssss<span class="comment" id="919d0b97-2318-48ea-8966-3f9137a61eaa" data-viewid="main" data-conversation="[]">sssssssssssss</span>sssssssssssssssssssssssss dsadas sdjfls k<span class="comment" id="43b841de-1e1d-48e0-a2dc-214b070982e2" data-viewid="main" data-conversation="[]">fjsdlkfsdjf slkdfj</span>s dflk<span class="comment" id="3b99e0f6-6a67-49a9-911f-5b5a5367f5ae" data-viewid="main" data-conversation="[]">sdjfld</span>skfj<span class="comment" id="e59f8698-7c6d-4a83-b7b1-8b637268ce50" data-viewid="main" data-conversation="[]">sdlfksdjflsdkkjfsd</span>flk sdjfsdflfks <span class="comment" id="2c047500-0a54-4518-b27c-b0fc8d5e37dd" data-viewid="main" data-conversation="[]">djl kjfsdreiou </span>ewrieowur</p><p class="paragraph">sdf</p><p class="paragraph">sd<span class="comment" id="6bc761c9-7b74-4cbc-b362-8075da20430f" data-viewid="main" data-conversation="[]">fsdfsdfs fjd flk</span>sdjf sldf jsdlfksdjf<span class="comment" id="0bb9a9bd-ce07-4471-9903-d512e99bca14" data-viewid="main" data-conversation="[]"> lskdjsdlkf jsf</span>lksdjflskd <span class="comment" id="b4fa7d1d-c5eb-4330-9fe5-5079375cbfed" data-viewid="main" data-conversation="[]">dsdlk js lfkks</span>djfsdlkfjsdlks</p><p class="paragraph"></p><p class="paragraph">djfslkfjsdlfksj<span class="comment" id="72c232e1-1377-4651-95fb-3ee0cdc52e81" data-viewid="main" data-conversation="[]">lsdkj sdlkddd</span>dddddddddd<span class="comment" id="dfa379c2-65c4-421d-8de9-aec494b2367e" data-viewid="main" data-conversation="[]">dddddddd</span>dddddddddd<span class="comment" id="11961908-5ceb-4431-9a95-b0d556249370" data-viewid="main" data-conversation="[]">ddddddd</span>ddddd</p><p class="paragraph">sdfsdfsfsdfsdfsf sfsdlfkdsf;dslkfsd;lfkf;lkfs fs</p><p class="paragraph">sfsf</p><p class="paragraph">fsd sf sflsjfsdlk<span class="comment" id="1cf213bd-43ea-49fc-8c15-52adc4d0c93f" data-viewid="main" data-conversation="[]">jflskdjf slkfj sdlfksdj fsl</span>kdfjsd<span class="comment" id="39161125-2088-4481-bf5c-1631a19b0899" data-viewid="main" data-conversation="[]">flksdjfsl</span>kdj</p>'
      }
      layout={EditoriaLayout}
      // onChange={source => console.log(source)}
      user={user}
    />
  </Fragment>
);

export default Editoria;
