import React from 'react';
import {Nav, Avatar, Dropdown, Button} from '@douyinfe/semi-ui';
import {IconQingyan ,IconInheritStroked,IconUserCircleStroked,IconWindowAdaptionStroked ,IconFollowStroked ,IconServerStroked,IconMailStroked1,IconStar, IconUser, IconUserGroup, IconSetting, IconEdit, IconSemiLogo, IconMember} from '@douyinfe/semi-icons';
import {IconTreeSelect, IconForm, IconBreadcrumb, IconBanner, IconBadge, IconNotification, IconSteps, IconTree, IconTabs, IconNavigation } from '@douyinfe/semi-icons-lab';

import {Link} from "react-router-dom";

class NavApp extends React.Component {
    render() {
        return (
            <div style={{ width: '100%' }}>
                <Nav
                    mode={'horizontal'}
                    items={[
                        { itemKey: 'user', text: 'Employees', icon: <IconFollowStroked />,link:'Employees'},
                        { itemKey: 'union', text: 'Departments', icon: <IconWindowAdaptionStroked />,link:'Departments' },
                        {
                            itemKey: 'approve-management',
                            text: 'employees_list',
                            icon: <IconUserCircleStroked />,link:'employees_list',

                        },
                        {
                            text: 'email',
                            icon: <IconMailStroked1 />,link:'email',
                            itemKey: 'job',
                        },
                        { itemKey: 'user', text: 'database_backup', icon: <IconServerStroked />,link:'backup'},
                        { itemKey: 'user', text: 'Api_Operations', icon: <IconInheritStroked />,link:'log'},
                    
                    ]}
                    onSelect={key => console.log(key)}
                    header={{
                        logo: <IconQingyan style={{ height: '36px', fontSize: 36 }} />,
                        text: 'TalentElite'
                    }}
                    footer={
                        <div>

                            <Button size='large' type='danger' style={{marginRight: 8}}>
                                <Link to='/homepage' style={{ textDecoration: 'none', color: 'inherit' }}>Logout</Link>
                            </Button>

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
                                <span>admin</span>
                            </Dropdown>
                        </div>}
                />
            </div>
        );
    }
}
export default NavApp;