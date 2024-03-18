import React from 'react';
import { Nav, Avatar, Dropdown,Button } from '@douyinfe/semi-ui';
import {
    IconStar,
    IconUser,
    IconUserGroup,
    IconSetting,
    IconEdit,
    IconSemiLogo,
    IconMember,
    IconBytedanceLogo
} from '@douyinfe/semi-icons';
import {
    IconTreeSelect,
    IconForm,
    IconBreadcrumb,
    IconBanner,
    IconBadge,
    IconNotification,
    IconSteps,
    IconTree,
    IconTabs,
    IconNavigation,
    IconProgress
} from '@douyinfe/semi-icons-lab';

import {Link} from "react-router-dom";

class NavApp extends React.Component {
    render() {
        return (
            <div style={{ width: '100%' }}>
                <Nav
                    mode={'horizontal'}
                    items={[
                        { itemKey: 'user', text: 'Home', icon: <IconNavigation />,link:'Homepage'},
                        { itemKey: 'user', text: 'Animals', icon: <IconBadge />,link:'animals_homepage'},
                        { itemKey: 'union', text: 'Habitats', icon: <IconTreeSelect />,link:'habitats_homepage' },
                        { itemKey: 'user', text: 'Activities', icon: <IconBanner />,link:'activities_homepage'},

                    ]}
                    onSelect={key => console.log(key)}
                    header={{
                        logo: <IconProgress style={{ height: '36px', fontSize: 36 }} />,
                        text: 'ZooConnect'
                    }}
                    footer={

                        <Button size='large' style={{marginRight: 8}}>
                            <Link to='/animals' style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
                        </Button>

                    }
                />
            </div>
        );
    }
}
export default NavApp;