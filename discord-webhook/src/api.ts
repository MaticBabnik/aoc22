export interface IStar {
    get_star_ts: number,
    star_index: number
}

export interface IDayLevel {
    1: IStar | undefined
    2: IStar | undefined
}

export interface ILeaderboardUser {
    id: number
    name: string;

    global_score: number;
    local_score: number;

    last_star_ts: number;
    stars: number;

    completion_day_level: Record<number, IDayLevel>;
}

export interface ILeaderboard {
    members: Record<number, ILeaderboardUser>;
    owner_id: number;
    event: string;
}

const DONT_KILL_THE_API: ILeaderboard = {
    members: {
        2306234: {
            completion_day_level: {},
            id: 2306234,
            stars: 0,
            last_star_ts: 0,
            local_score: 0,
            name: "Natan-P",
            global_score: 0
        },
        1520091: {
            completion_day_level: {},
            id: 1520091,
            stars: 0,
            last_star_ts: 0,
            local_score: 0,
            name: "Jackzy",
            global_score: 0
        },
        1118146: {
            global_score: 0,
            name: "Akaj-lab",
            local_score: 42,
            last_star_ts: 1669873094,
            stars: 2,
            id: 1118146,
            completion_day_level: {
                1: {
                    1: {
                        star_index: 15138,
                        get_star_ts: 1669873021
                    },
                    2: {
                        get_star_ts: 1669873094,
                        star_index: 15459
                    }
                }
            }
        },
        1607942: {
            completion_day_level: {},
            id: 1607942,
            stars: 0,
            last_star_ts: 0,
            local_score: 0,
            name: "Emil-Demic",
            global_score: 0
        },
        2251365: {
            global_score: 0,
            name: "alotofms",
            local_score: 37,
            last_star_ts: 1669876380,
            stars: 2,
            id: 2251365,
            completion_day_level: {
                1: {
                    1: {
                        get_star_ts: 1669876294,
                        star_index: 25993
                    },
                    2: {
                        star_index: 26234,
                        get_star_ts: 1669876380
                    }
                }
            }
        },
        1067750: {
            stars: 2,
            last_star_ts: 1669876390,
            completion_day_level: {
                1: {
                    2: {
                        star_index: 26261,
                        get_star_ts: 1669876390
                    },
                    1: {
                        get_star_ts: 1669876228,
                        star_index: 25790
                    }
                }
            },
            id: 1067750,
            name: "Jakob Kordež",
            global_score: 0,
            local_score: 37
        },
        1012476: {
            id: 1012476,
            completion_day_level: {
                1: {
                    2: {
                        star_index: 1485,
                        get_star_ts: 1669871246
                    },
                    1: {
                        get_star_ts: 1669871166,
                        star_index: 0
                    }
                }
            },
            last_star_ts: 1669871246,
            stars: 2,
            local_score: 44,
            global_score: 0,
            name: "Martin"
        },
        1071633: {
            stars: 0,
            last_star_ts: 0,
            completion_day_level: {},
            id: 1071633,
            name: "martinsifrar",
            global_score: 0,
            local_score: 0
        },
        1519980: {
            local_score: 0,
            name: "borbuh",
            global_score: 0,
            completion_day_level: {},
            id: 1519980,
            stars: 0,
            last_star_ts: 0
        },
        1526712: {
            name: "Janez Novak",
            global_score: 0,
            local_score: 0,
            stars: 0,
            last_star_ts: 0,
            completion_day_level: {},
            id: 1526712
        },
        1110646: {
            completion_day_level: {},
            id: 1110646,
            stars: 0,
            last_star_ts: 0,
            local_score: 0,
            name: "SoulyZero",
            global_score: 0
        },
        1777109: {
            local_score: 0,
            name: "DemsarMa",
            global_score: 0,
            completion_day_level: {},
            id: 1777109,
            stars: 0,
            last_star_ts: 0
        },
        1056938: {
            completion_day_level: {
                1: {
                    1: {
                        star_index: 25450,
                        get_star_ts: 1669876118
                    },
                    2: {
                        get_star_ts: 1669876283,
                        star_index: 25952
                    }
                }
            },
            id: 1056938,
            stars: 2,
            last_star_ts: 1669876283,
            local_score: 40,
            name: "MaticBabnik",
            global_score: 0
        },
        1025477: {
            name: "Vid",
            global_score: 0,
            local_score: 34,
            stars: 2,
            last_star_ts: 1669878640,
            completion_day_level: {
                1: {
                    1: {
                        star_index: 32647,
                        get_star_ts: 1669878491
                    },
                    2: {
                        star_index: 33050,
                        get_star_ts: 1669878640
                    }
                }
            },
            id: 1025477
        },
        2330833: {
            local_score: 0,
            global_score: 0,
            name: "gapidobri",
            id: 2330833,
            completion_day_level: {},
            last_star_ts: 0,
            stars: 0
        },
        1134515: {
            local_score: 0,
            global_score: 0,
            name: "Lenart Svetek",
            id: 1134515,
            completion_day_level: {},
            last_star_ts: 0,
            stars: 0
        },
        1110500: {
            name: "Aiken Tine Ahac",
            global_score: 0,
            local_score: 0,
            stars: 0,
            last_star_ts: 0,
            completion_day_level: {},
            id: 1110500
        },
        1177570: {
            stars: 0,
            last_star_ts: 0,
            completion_day_level: {},
            id: 1177570,
            name: "aljaztravnik",
            global_score: 0,
            local_score: 0
        },
        1668225: {
            name: "Tim Thuma",
            global_score: 0,
            local_score: 0,
            stars: 0,
            last_star_ts: 0,
            completion_day_level: {},
            id: 1668225
        },
        1140626: {
            local_score: 0,
            name: "juje",
            global_score: 0,
            completion_day_level: {},
            id: 1140626,
            stars: 0,
            last_star_ts: 0
        },
        1039798: {
            local_score: 0,
            global_score: 0,
            name: "janči Zuletek",
            id: 1039798,
            completion_day_level: {},
            last_star_ts: 0,
            stars: 0
        },
        2326177: {
            global_score: 0,
            name: "gigibu5",
            local_score: 0,
            last_star_ts: 0,
            stars: 0,
            id: 2326177,
            completion_day_level: {}
        }
    },
    owner_id: 1012476,
    event: "2022"
}

export async function get(id: string | number, session: string, mock: boolean): Promise<ILeaderboard> {
    if (mock) return DONT_KILL_THE_API;

    const url = `https://adventofcode.com/2022/leaderboard/private/view/${id}.json`

    const res = await
        fetch(url, {
            headers: {
                cookie: `session=${session}`,
                "cache-control": "max-age=0",
            },
            referrer: "https://adventofcode.com/2022/leaderboard/private/view/1012476",
            method: "GET",
        });

    const o = await res.json();
    return o as ILeaderboard;
}

