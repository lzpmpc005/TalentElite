import React from 'react';
import { Nav, Avatar, Dropdown } from '@douyinfe/semi-ui';
import {IconStar, IconUser, IconUserGroup, IconSetting, IconEdit, IconSemiLogo, IconMember} from '@douyinfe/semi-icons';
import { IconTreeSelect, IconForm, IconBreadcrumb, IconBanner, IconBadge, IconNotification, IconSteps, IconTree, IconTabs, IconNavigation } from '@douyinfe/semi-icons-lab';
import ActivityComponent from "./components/Activity";
import {Link} from "react-router-dom";

class NavApp extends React.Component {
    render() {
        return (
            <div style={{ width: '100%' }}>
                <Nav
                    mode={'horizontal'}
                    items={[
                        { itemKey: 'user', text: 'Animals', icon: <IconBadge />,link:'animals'},
                        { itemKey: 'union', text: 'Habitats', icon: <IconTreeSelect />,link:'habitats' },
                        {
                            itemKey: 'approve-management',
                            text: 'Zookeepers',
                            icon: <IconBreadcrumb />,link:'zookeepers',

                        },
                        {
                            text: 'Carelogs',
                            icon: <IconSteps />,link:'carelogs',
                            itemKey: 'job',
                        },
                        { itemKey: 'user', text: 'Members', icon: <IconMember />,link:'members'},
                        { itemKey: 'user', text: 'Activities', icon: <IconBanner />,link:'activities'},
                        { itemKey: 'user', text: 'Tour_schedules', icon: <IconNavigation />,link:'tour_schedules'},
                    ]}
                    onSelect={key => console.log(key)}
                    header={{
                        logo: <IconSemiLogo style={{ height: '36px', fontSize: 36 }} />,
                        text: 'ZooConnect'
                    }}
                    footer={
                        <Dropdown
                            position="bottomRight"
                            render={
                                <Dropdown.Menu>
                                    <Dropdown.Item>详情</Dropdown.Item>
                                    <Dropdown.Item>退出</Dropdown.Item>
                                </Dropdown.Menu>
                            }
                        >
                            <Avatar size="small" color='light-blue' style={{ margin: 4 }}>VC</Avatar>
                            <span>Vincent</span>
                        </Dropdown>
                    }
                />
            </div>
        );
    }
}
export default NavApp;