import { getAllRoutes, getListOfRegions, getListOfSeasons, getRoutesByRegion } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();

    const region = req.query.region;
    const season = req.query.season;
    let routes = await getAllRoutes();

    if (region) {
        routes = await getRoutesByRegion(region);
    }
    if (season) {
        routes = routes.filter(route => route.bestSeason.toLowerCase() === season.toLowerCase());
    }

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        query: { region, season }
    });
};