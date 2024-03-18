import React from 'react';
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import NavApp from './Header_homepage';
import {IconProgress} from "@douyinfe/semi-icons-lab";
import Animals_Homepage2 from "./Animals_Homepage2";
const Homepage = () => {
    const { Title, Paragraph } = Typography;

    const style = {
        width: '100%',
        height: '700px',
    };

    const titleStyle = {
        position: 'absolute',
        top: '100px',
        left: '100px',
        color: '#1C1F23'
    };

    const colorStyle = {
        color: '#1C1F23'
    };

    const renderLogo = () => {
        return (
            <img src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/semi_logo.svg' alt='logo' style={{ width: 87, height: 31 }} />
        );
    };

    const imgList = [
        'https://images.unsplash.com/photo-1701532410930-d5c30e2d7c4e?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1503919005314-30d93d07d823?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1682091968155-3828011a883e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];

    const textList = [
        ['Animals',
            'Explore the Beauty of Natures Creatures!'
        ],
        ['Register as a Member',
            'Support Conservation Efforts - Join Our Membership Program!'
        ],
        ['Activities',
            'Experience Fun and Education with Our Zoo Events!'
        ],
    ];

    return (

        <div>
            <NavApp />
            <br></br>
            <Carousel style={style} theme='dark'>
                {
                    imgList.map((src, index) => {
                        return (
                            <div key={index} style={{ backgroundSize: 'cover', backgroundImage: `url(${src})` }}>
                                <Space vertical align='start' spacing='medium' style={titleStyle}>
                                    <IconProgress/>
                                    <Title heading={2} style={colorStyle}>{textList[index][0]}</Title>
                                    <Space vertical align='start'>
                                        <Paragraph style={colorStyle}>{textList[index][1]}</Paragraph>
                                        <Paragraph style={colorStyle}>{textList[index][2]}</Paragraph>
                                    </Space>
                                </Space>
                            </div>
                        );
                    })
                }
            </Carousel>
            <br></br>
<Animals_Homepage2/>
        </div>
    );
};
export default Homepage;