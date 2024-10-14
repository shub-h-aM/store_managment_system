
import React from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import AppItem from './AppItem';
import CardItem from './CardItem';
import AdminPage from './AdminPage';

// Main Component Rendering the List and Grid View
class CardDetails extends React.Component {
    render() {
        return (
            <Container style={{ marginTop: '20px' }}>
                {/*<Typography variant="h4" gutterBottom>*/}
                {/*    Scrollable List*/}
                {/*</Typography>*/}
                {/*<Box*/}
                {/*    display="flex"*/}
                {/*    overflow="auto"*/}
                {/*    style={{ whiteSpace: 'nowrap' }}*/}
                {/*>*/}
                {/*    {this.props.birds.map((app) => (*/}
                {/*        <AppItem app={app} key={app.id} />*/}
                {/*    ))}*/}
                {/*</Box>*/}

                <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Grid View
                </Typography>
                <Grid container spacing={3}>
                    {this.props.animals.map((app) => (
                        <CardItem app={app} key={app.id} />
                    ))}
                </Grid>

                <AdminPage onAdd={this.props.onAdd} />
            </Container>
        );
    }

    static defaultProps = {
        birds: [
            { id: 1, img: 'https://img.mobiscroll.com/demos/gridlayout/toucan.jpg', name: 'Toucan' },
            { id: 2, img: 'https://img.mobiscroll.com/demos/gridlayout/kingfisher.jpg', name: 'Kingfisher' },
            { id: 3, img: 'https://img.mobiscroll.com/demos/gridlayout/swift.jpg', name: 'Swift' },
            { id: 4, img: 'https://img.mobiscroll.com/demos/gridlayout/humming.jpg', name: 'Humming bird' },
        ],
        animals: [
            { id: 1, img: 'https://img.mobiscroll.com/demos/gridlayout/okapi.jpg', name: 'Okapi', about: 'Native to Congo.' },
            { id: 2, img: 'https://img.mobiscroll.com/demos/gridlayout/dragon.jpg', name: 'The Blue Dragon', about: 'Found in Indian Pacific Oceans.' },
            { id: 3, img: 'https://img.mobiscroll.com/demos/gridlayout/wolf.jpg', name: 'The Maned Wolf', about: 'Often found in Brazil.' },
            { id: 4, img: 'https://img.mobiscroll.com/demos/gridlayout/fossa.jpg', name: 'Fossa', about: 'A carnivorous animal in Madagascar.' },
        ],
    };
}

export default CardDetails;





// import React from 'react';
// import { Card, CardContent, CardMedia, Grid, Typography, Container, Box } from '@mui/material';
//
//
// class AppItem extends React.Component {
//     render = () => {
//         const { app } = this.props;
//         return (
//             <Card style={{ margin: '10px', width: 150 }}>
//                 <CardMedia
//                     component="img"
//                     image={app.img}
//                     alt={app.name}
//                     draggable="false"
//                     height="100"
//                 />
//                 <CardContent>
//                     <Typography variant="body2" align="center">
//                         {app.name}
//                     </Typography>
//                 </CardContent>
//             </Card>
//         );
//     };
// }
//
// // CardItem Component for the Grid View
// class CardItem extends React.Component {
//     render = () => {
//         const { app } = this.props;
//         return (
//             <Grid item xs={12} sm={6} lg={4} xl={3}>
//                 <Card>
//                     <CardMedia
//                         component="img"
//                         image={app.img}
//                         alt={app.name}
//                         height="140"
//                         draggable="false"
//                     />
//                     <CardContent>
//                         <Typography variant="h6">{app.name}</Typography>
//                         <Typography variant="body2" color="textSecondary">
//                             {app.about}
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             </Grid>
//         );
//     };
// }
//
// // Main Component Rendering the List and Grid View
// class CardDetails extends React.Component {
//     render = () => {
//         return (
//             <Container style={{ marginTop: '20px' }}>
//                 <Typography variant="h4" gutterBottom>
//                     Scrollable List
//                 </Typography>
//                 <Box
//                     display="flex"
//                     overflow="auto"
//                     style={{ whiteSpace: 'nowrap' }}
//                 >
//                     {this.props.birds.map((app) => (
//                         <AppItem app={app} key={app.id} />
//                     ))}
//                 </Box>
//
//                 <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
//                     Grid View
//                 </Typography>
//                 <Grid container spacing={3}>
//                     {this.props.animals.map((app) => (
//                         <CardItem app={app} key={app.id} />
//                     ))}
//                 </Grid>
//             </Container>
//         );
//     };
//
//     static defaultProps = {
//         birds: [
//             { id: 1, img: 'https://img.mobiscroll.com/demos/gridlayout/toucan.jpg', name: 'Toucan' },
//             { id: 2, img: 'https://img.mobiscroll.com/demos/gridlayout/kingfisher.jpg', name: 'Kingfisher' },
//             { id: 3, img: 'https://img.mobiscroll.com/demos/gridlayout/swift.jpg', name: 'Swift' },
//             { id: 4, img: 'https://img.mobiscroll.com/demos/gridlayout/humming.jpg', name: 'Humming bird' },
//         ],
//         animals: [
//             { id: 1, img: 'https://img.mobiscroll.com/demos/gridlayout/okapi.jpg', name: 'Okapi', about: 'Native to Congo.' },
//             { id: 2, img: 'https://img.mobiscroll.com/demos/gridlayout/dragon.jpg', name: 'The Blue Dragon', about: 'Found in Indian Pacific Oceans.' },
//             { id: 3, img: 'https://img.mobiscroll.com/demos/gridlayout/wolf.jpg', name: 'The Maned Wolf', about: 'Often found in Brazil.' },
//             { id: 4, img: 'https://img.mobiscroll.com/demos/gridlayout/fossa.jpg', name: 'Fossa', about: 'A carnivorous animal in Madagascar.' },
//         ],
//     };
// }
//
// export default CardDetails;
