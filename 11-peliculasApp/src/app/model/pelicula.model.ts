export class Pelicula {
    id: number;
    title: string;
    releaseDate: string;
    popularity: number;
    voteAverage: number;
    overview: string;
    posterPath: string;
    backdropPath: string;

    getOverviewAbr() {
        if (this.overview !== undefined) {
            const arr = this.overview.split(' ').slice(0, 25);
            let nuevoOverview = '';

            arr.forEach( element => {
                nuevoOverview += element + ' ';
            });

            return nuevoOverview;
        }
    }
}
