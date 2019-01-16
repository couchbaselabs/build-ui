export class Product {
    name: string;
    releases: Release[];
    expanded: boolean;

    constructor(pname:string) {this.name = pname; this.releases = new Array(); this.expanded = false;}
}

export class Release {
    product_name: string;
    name: string;
    versions: Version[];
    expanded: boolean;

    constructor(pname: string, rname:string) {this.name = rname; this.product_name = pname; this.versions = [];}
}

export class Version {
    product_name: string;
    release_name: string;
    name: string;
    builds: Build[];

    constructor(pname: string, rname: string, vname: string) {
        this.product_name = pname;
        this.release_name = rname;
        this.name = vname;
        this.builds = [];
    }
}

export class Build {
    name: string;
    key: string;
    product: string;
    release: string;
    version: string;
    build_num: string;
    prev_build_num: string;
    new_commits: Commit[];
    timestamp: number;
    timestamp_date: Date;
    download_url: string;

    constructor(pname: string, rname: string, vname: string, bname: string) {
        this.product = pname;
        this.release = rname;
        this.version = vname;
        this.build_num = bname;
        this.name = bname;
    }
}

export class Commit {
    key: string;
    href: string;
}