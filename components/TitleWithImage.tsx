import React from 'react';
import Image from 'next/image'
import { Typography } from 'antd';

type TitleWithImagePropsType = {
    title: string;
    imageLink: string;
}

const TitleWithImage:React.FC<TitleWithImagePropsType> = ({
    title,
    imageLink
}) => {
  return (
      <React.Fragment>
        <Image src={imageLink} width={100} height={100} alt='Neptune Mutual' style={{width: '100%', margin: '0 auto'}} />
        <Typography.Title level={4} style={{color: 'white', textAlign: 'center'}}>{title}</Typography.Title>
      </React.Fragment>
  )
}

export default TitleWithImage