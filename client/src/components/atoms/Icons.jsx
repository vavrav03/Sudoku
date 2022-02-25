import React from 'react';

import classicEasyImage from 'assets/img/icons/classicEasy.png';
import classicNormalImage from 'assets/img/icons/classicNormal.png';
import classicHardImage from 'assets/img/icons/classicHard.png';
import size2x2Image from 'assets/img/icons/size2x2.png';
import size2x3Image from 'assets/img/icons/size2x3.png';
import size4x4Image from 'assets/img/icons/size4x4.png';
import classicXlImage from 'assets/img/icons/classicX.png';
import jigsawImage from 'assets/img/icons/jigsaw.png';
import samuraiImage from 'assets/img/icons/samurai.png';
import samuraiMixedImage from 'assets/img/icons/samuraiMixed.png';
import coinImage from 'assets/img/coin.png';

export function Icon({ divClassName, iconClassName }) {
   return (
      <div className={divClassName}>
         <i className={iconClassName}></i>
      </div>
   );
}

export function ImageIcon({ width, height, image }) {
   return <img alt={"nothing important"} height={height} width={width} src={image}></img>;
}

export function ClassicEasySudokuIcon({ width, height }) {
   return (
      <ImageIcon
         width={width}
         height={height}
         image={classicEasyImage}
      ></ImageIcon>
   );
}

export function ClassicNormalSudokuIcon({ width, height }) {
   return (
      <ImageIcon
         width={width}
         height={height}
         image={classicNormalImage}
      ></ImageIcon>
   );
}

export function ClassicHardSudokuIcon({ width, height }) {
   return (
      <ImageIcon
         width={width}
         height={height}
         image={classicHardImage}
      ></ImageIcon>
   );
}

export function Size2x2SudokuIcon({ width, height }) {
   return (
      <ImageIcon width={width} height={height} image={size2x2Image}></ImageIcon>
   );
}

export function Size2x3SudokuIcon({ width, height }) {
   return (
      <ImageIcon width={width} height={height} image={size2x3Image}></ImageIcon>
   );
}

export function Size4x4SudokuIcon({ width, height }) {
   return (
      <ImageIcon width={width} height={height} image={size4x4Image}></ImageIcon>
   );
}

export function ClassicXSudokuIcon({ width, height }) {
   return (
      <ImageIcon
         width={width}
         height={height}
         image={classicXlImage}
      ></ImageIcon>
   );
}

export function JigsawSudokuIcon({ width, height }) {
   return (
      <ImageIcon width={width} height={height} image={jigsawImage}></ImageIcon>
   );
}

export function SamuraiSudokuIcon({ width, height }) {
   return (
      <ImageIcon width={width} height={height} image={samuraiImage}></ImageIcon>
   );
}

export function SamuraiMixedSudokuIcon({ width, height }) {
   return (
      <ImageIcon
         width={width}
         height={height}
         image={samuraiMixedImage}
      ></ImageIcon>
   );
}

export function SocialIconCreator({ companyName }) {
   return (
      <Icon
         divClassName={`social-icon ${companyName}-icon`}
         iconClassName={`fab fa-${companyName}`}
      />
   );
}

export function FacebookSocialIcon() {
   return <SocialIconCreator companyName={'facebook-f'} />;
}

export function TwitterSocialIcon() {
   return <SocialIconCreator companyName={'twitter'} />;
}

export function GoogleSocialIcon() {
   return <SocialIconCreator companyName={'google'} />;
}

export function LockIcon() {
   return <Icon divClassName={`lock-icon`} iconClassName={`fas fa-lock`} />;
}

export function CoinIcon({ height, width }) {
   return (
      <span style={{height: height, width: width}} className='coin-icon'>
         <ImageIcon height={height} width={width} image={coinImage} />
      </span>
   );
}
