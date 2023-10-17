/** 统计类型字典 */
export const StatisticalTypes: SType[] = [
    {
        label: '供水量',
        value: 'csl',
        unit: '万吨'
    },
    {
        label: '原水量',
        value: 'jsl',
        unit: '万吨'
    },
    {
        label: '用电量',
        value: 'ydl',
        unit: 'kwh'
    },
    {
        label: '用氯量',
        value: 'yll',
        unit: 'kg'
    },
]
export interface SType {
    label: string,
    value: string,
    unit: string
}
export const Icons: { [key: string]: string } = {
    // 供水量
    csl: "data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAITUlEQVR4nN2bfWxW1RnAf6d0ZbGtQFeUDheZK/JRg0bIsJHPBLVpnSxumohmqAviZtwWqWPZkn2YLcyAm³T6h/tjzMSPRGI2He1UBtlilJKluKFdhRYDGESlSKHEZZ3bs5xz73vf+33v2/e+F7qTNu+95573nOf5vc95znPOPUeJCElp1a8BVfzXl577wjW+e+t/JtCqFPNQzEVxOYoZwBSlqLfLjAKnleJ9FAeBt1EMoNgDHPPXH5CB4qfy3evPP6yKVrA6UXtAM1Luey2Ai5vgEkjm³0IFa4B2MEoH6vDlaRD1IlyiYFGhHrvc2yL0KHgGRV8h3yODKgph6nTdk/D7pgJgK5UEoV7BehR3Icz3l08BwXtfFF4DnCvCAwr+gWIbwhPAaGoIMakqLQADQYrXBSgIUxF+hHBYhM1aeQearzykyHPfE8ifj24DDtttThVfGU8dJFtASQB8SimEOwUGEX6M0OB5XjkImLYwbQ7aMqhYCOUC8FC2lGpGeBUx5tgY8jwPCDo12jK8KvCF8UBIbQEuJW9B6BPh2pDucC4g6E8tyz7ByBaAkAkAbfICWxCeQ7gwxiecKwhapudsGVVaCGkB1CA8hbAhUsnzAwK2jE/ZMiemxGFw5VZqULygom³hERUHJD0vxglZDZFR+WtE0aCE1cBYnH6xFrDyl8aUfoPQlvqXPn8soU0wssdGAkldYBPC7SUref5AuF3g53EKRs4FVjzCV1Fs98TW/tg/LC4v5Tnh5SFFHsF6YvJv7W5ne2oAKzZzGYp9KKY4Ak5sCKdRXN3dzjt+XQNdYPnDGgpPIkzxmC7jNPfzoztoXZ7s6An6g6APENYiLAkoMPEhLNFhs19dTxdYtompypqPT4805YndHU7o9YjuDkYKOnvjAOHbAtOdqaT9oW//3Bmwldj07//A6L/gvTPQ/wHsPQpvvm//QDFxgs6/4mJYPBNaLoLP1kNdDXwqXcjmpPbfF0G44oTpWkfgJwELWPZT6lAcQdEQ9kv/5bulCRCWjp2BZ9+Al4e8Spv2quCGZrhtgaV0uckNwGcJHwGzum80q1BFHyDCvYUpbWifzyDNvBA6l8NjN8GMuqJP0Ne/6oAN12ajvCm³oT5BT6XXF4oZAEsfMhHfPbGOL8M0Zzo8vhoWXAwLmuCxL8GcxmzbSHCM6zt2WHZRbRdoRTGbkDhdcHWHDNOUT8PmDquBSSX271IgRMwdmhW0Aq9X2QVviRuO0qysjCdNUpVTPsUQeav+LFhAm8cphc3YJlry/uJhlmBmt9VLfsglZuXVNxxNdAgpptJz2l/kc9UI1xAy7vshLPtZdDAUFixdUAOfb4RVc+HGK6B6UmkKfPJf6DkAu96BwyPwz09KD5ZSQGitFuEqv3kkWYLjGP3lXc8/HoP+96D/OPT0w6bV8JnadMqf/Bh+8AocOhkRQWa3qLKgCmFemKNIitP9cULc88EP4XsvWNFhUtJlvv8SDA3nMneYpwFcGlZ51hCGPoQX30wGsGMADg276qgshEv1INQUVXnWEHYfSAawezDXWWSj9gH1of05Y5+gnw9+kAxg6EREG5VZaK3To0B9pAIZQ0jjA8Zc3j4HCPXVHoFzgJCUzHfClKwQBB0JjmoryAtCGgI5vncY1aPAqFNLnFOLySvJMaYAEOv4snWMZ6tEOB6qYKUgpASQE4RhbQFHIhWsBIQk/dMqmQ2EI9oHDHj6jb//ZuwT0lhA6j6f9DzZJwzoUWB/oGAFISx/OHoCVRCuJCXLg7BfA9hDWMEKW0IaS8kBQm/Vnl/wLsKB0H5TqCWP0SH/ly8HX76No1V2/ktEFfz/hfBHfVtlZ273fCknCKvmwfXzzxkE87a4sCb4up6HiKLZv/HQ34+cvlWmT2ishwdusK7fOAonzubqE4ZsnS0L6H0UMbsv/eQqaAmdbVA72fp/sC337vDEK1+zHrkXpTWAU3lAuK4FWpuLDS++DK5vyQ3CKbG22prkAOh91MwJtoZ+KUMItTVwX8ju7W+uhLrJuUDo2nmnPf8J7A8QtppXyBWEsHYpNNQFAUyrhTtaYxTIBoLWrcvdrgdA71ZGEDZ6BM8Qglby5i8GlS+kmxdCQ21FIWzc+XXzdjgcgF35bxFeqwSELy+EyTE7E/Wzm66KqKN8CK8Z3XwpAKC3y4wIepvM6awhrGyJVr6QVsytSLB0WoS1f1rnSOuk0FeTvV0cQlgXUK5MCE3TkgE0TU0AOT4I63at51BYe5HvZnu72I51ACIzCEdPJAN492QKayoNwpZd3wjfIxgLwK53I8LTWUF4fm8ygN/1xStZIgQte+zmnlgAe7tMXXcj9mSpTAjdfdC9L7q9nr/Bjr7MJlBa5ruNR4tJqY7NLf4WNQq2oVjjBNuFhQzXdSE/9Jib6/66K+Er18DsJitr8Dg8/1fY9VZEPWGLJvHPnzGHtxRjOm/3/dG6pT01NiaKO5ReQIUNnklPyMktSZhA7fw77NwfASqsHoJ1OPfB548gPIjLSONS+g0qYiytE721RDjjtJjjBCqhO5zRsonQaUnrkykipT8yg6OsHh0WVipYGicEHeRcrdc1Qn1CJgC8EPR8eqlxMjB8DiEM245uqYiJXcLbKBtAOASxj6zNNltPhY9yhKDbekistrcZSeIspVwAoSZVVHbEHJyEWcb5CAMVhDAgVhuz7JOjI6mHyHIApICA/Y5xC9bx1kVirS0MZQBhSMTUtQhm³Vv0S82UjjGxC6Q+PO28TXGv0xWGq+BQqOO5PlF8R4l1fB5FC8IcgcsVzEAxDeECvW1A4KxSZjXqFHBQ4ICCfnN8XjjmEiHbt9LA/wDgOx+/yPgzpgAAAABJRU5ErkJggg==",
    csl_d: "data:img/png;base64,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³HSAqC+lOjw2N+OUtzhKDq8ijIw3Z9wvwtwOj+UhAuEHw60UHixj2EcIPkLgBPk+x37BjnCyDpUFghqOy7Qayn9ukpxwKEoMr6GcH1oLZtjpnP5tACYPaqrBDUORVAHSBQC3CvdZ0h5xDOkdhLUpW1n8S4pyFyvgDSFLY/R6j5hE6AzSQ2AjxkP802awgXSG2eYqO+dbZTOZWz8ROyicdhMKGwGpq07YNqOErsVrWe01JtiDyZ2OnNH5FSrb7KJKVFhA2k2j6PFSQfEpEikv+FSFzIm4TcFGGfmqYXkTMkT0BkaL4fbjkKgP8Ba0lpoDlHCvkAAAAASUVORK5CYII=",

    // 原水量
    jsl: "data:img/png;base64,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³7G/pNICfAh38tqCK9bV5Lky9Dq4ZCJe0go1vwZL1cO5CPE7smRa5MH0cXDvAHNL+tRZ+VW3N7mzadKPUshnMuBpG94FmObCpFp7ZChcanN2wtlbNYUYZjCmC/56H6kPw3E6oF1uaNmGuLvKkYGy1NeXZ3w6XzuJ+YwemX2tqfZ92HUwZh8PePgpznoO6c/FWtnVLmF8JQ1zbEt46AvN+bzoeS1uDnF8BA12LKHveh/v+ZHaLsd4hT8e9GfrmO+P+5g1YsSup3uHBjbfxQOw599vhRcYrZL/iY30v/yoe69cNlkyFy9uacbSTi271itc2sBAWf98aEAm0bw2LKr3itQ2+Eh6vgEtbmkX3skvgiQqveG3XFydVHbS2xfbnHABqFnEK174gN4TcgI11vfLhqWnQX8P4AfTt6h9PW1EBLJlsDoaWTIIiH0ExKymAJ74L/Qpg8QTo0dE/nq42SbQJ8zbejmOlwnNgonQmCsVWFObGFVd1mHa9two0BVv5N1i2m³QwtA3FqE1TcQj2/J41i40eQW+TOQ3ekrB0A1RFMM2N0jbUwnL3rBHH9WkRJrvF+wKwnnsPIR7dlmjDRXj4eVj9etMQ/8e9sGADNDSEdoFTq6fjOycN3igJqzEPQDSGxRKVBnh8LSzbmJyTL2yHVVuTi7tqO6zZlVzcFTXw5GtO4T4QFlb/0Bz1+Zn/kRmshxXzlNAZmOiY/lr96rOvQN1ZmPlN2yTGZcuq4dfVZj3UcWeEHGh6uhpWbjfTqvsUpowKdI2nNsOaPbbuTpz3LXdWAXPDIAbvFDU/NdDbEGuyhLd4Pb8FfrHaLIKOJAQWrYOlm+LP/XYLPPpnaHDVRH392Muwclv8V1y+BZ7c6NDVGHfBemu5LXzEqH2+7dU7vPXebr7H5obf4RkAtVCwHEWlZ/prfe9XCN/+GozuBzv2w9oaePOf/tPc/oVwy3AoLYKag7B2F/z9A/9pqx43fGswlPaE1w/Ci3vhneMJp9L6hNmUzXdxPky8ETUQAB4IOv1HUcwJgtBE1hMeA+7dfHf4Lx+zRNvl3dXhHvTWEuFj+/0mMoH6WPsmwj3JitcWeGAiAEKsdxiCsK0JQdiGMFivayQvPQxArLUPhqDn06N0IwN89DlC+MjwQRglYoxdvK1mWgCSgyDWkTW9Ae5BhBOfIQSd10Ni5r3c8MQdPyMA4vwMgaD/nTIOTsJVCPfqtfYsQqgVM4+rrJOjp3zTyBhA6hCw3jEuxDzeOlQPA/QyWwQQDokYaQ0FI+2F+qVmWJuQigUenm4c+dk+dUaOUVdstci7grQb2C2KWUrM4/Mo+iH0EShSkI+iA4LeFXxB4IxSnEQ4CRwQ2K/gbeP4vHDM7pJ7hcrhsmtEmNCA/wG6BNFqPiMgpgAAAABJRU5ErkJggg==",
    jsl_d: "data:img/png;base64,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³WL+uCeviusD9IIPDE5ofSDBZOgPBzm9ubzMpbNmu/dGTapeMT4G4bmcJX3T1Y2Bo7L5SXjnMgeGxRKPDdaVTvPJKHI7JoZ/gc5F6TBCUQ/rw4/MI9l3MumKpyMjoJLp6hsJxQ+ch8rlHHl7Xb1edw4a9duUJgoftIKj0k3MBnO8eSKmRvQOjuNCbGrC+gUvhp5mC9A+OIRC8mGyecGRXxzdOONVm/8pM5PUVUA5QWCOUvdqQDfO8oLOrX1vitm9Y49ja7sAQugJDWj9US911a539h5oj9PZf0srOzy1gTVOtY9lAcARDFyfDC6i4eQJiK8bXIHwpEUrHIxuMTZ+eJXjKyRICwWF89Em³bfzvXGcvzvcMRp9IoHcYn33ei/ii6vvn5/sQ7BuN1ds7ooGztovo7BrUxvwkM8ZTIJ/91s4N1oYZxPa1ud+/fhL6C2mREcALwXGB7Ik4WMvoUOYv0Z7Y8poKjI1fRd/AqLa+h81yucxfjFUNaibnx8TUtOZUVeTXbvJVXlaMlXVVWgxhYvIahi9O4PqNWzb1mpa7r0PkmW/v2nQ3kfJacVsAr52MDSMxCOrrYYHsc4Jwn8QTfg2R/d95tD3hk9clkRMEdaOP2diLBJ8AcSPRZOkeLaBukHyCwIupKq/E8Z0hBwj66LAZxJn7CIJqSzvIE+nuRSRzgk4Q+gjuDDtIXLmHEK6QfBbATpL9jDUyUwAWhe0gqGYeB7GawMsAp79CCOpevyC4GtRem6Pp2kwBRJVMDkHlqQXUIQL1APeb9xlch9BDYj9Jda+DJK7Z+YSMASwCgvozS+AIwLUktgA8ah9mSxtCH4mjgHqpWnt19gip72fa+4R0xP7tcQMEbUYYfjNVnx2GY/N2eVqqlf40/KY3f0rKchF1ElXaRNhMqtfnUU2yVESWkJyDyE0hZwiZEWGQxAUR6SJ5FiKXku07GCNLaXUCAP8F884VtRyfqzAAAAAASUVORK5CYII=",

    // 用电量
    ydl: "data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAH90lEQVR4nNWbWYwVVRrHf+fatoZw2WyMhlUBETRgZDQS0KiJY4MPvKgPLjNqMuKTPrgQNc4wxjVuQaMZxoVRFqNEIxr36IPathMBEZcGQUQB2whC0y0uLfKZU3Xq3lpO1a26t+pKV3Jz79m//6/O8p1bp5SIcPZDgKp+9M9AWKVMx5p/FDBTKaagOB7FcSiOAoYqRdnk6QP2KsV3KL4ANqDoQtEJ7AjXH7GB6rcKhWPTTVyL/hap5nPCugHxhUmZrtyAwAwFFwFzwREdaSMUp0GURRit4C9ePSbfBhFeUbACxRovPmCDqhrh1OkLh78r6cZwpwectSjjnbanl5ViPorLgam2/JU7kBRHtEf54j9HsQRY7PSaHHpCqXILxaWD7yOEwvb0YQj/Qtgqwj0IU706w/m93pYY5w8TiZ+KbgO2mjaHSShPoA6i8eH0AICMEBTCZQKbEBYijAikFwcBpy2cNjcZG1S9EEoQaiQdhIkI7yIsQWiLhVQsBH21GRveFZhQD4RSJFNtCBcgrBFhVqqeUjwE/a1tWSs4tmWCUBkCKSDoSfdehGcRhmQaLs2BoG161tio0kKIToJ2Ea0IyxCujRV5cEDA2LjM2FwTQksgwvysrKPu1SqwSkF7JU/jfkKST2CP84eDfoIt/iJRjFDCPKA/yU+ozgHhu+ZarrvSEwjtdS6Rf2ZPaBcc2xOHQ3AOiEK4E+HizCIPHggXC9xFON4HIckROl+EBYFGBiaEG5JWh4gfYCo4FuExkifGgQThUcHRFIFg8wOUCE8iDA0Nh4EMQWt50uYx2vyAvyPMTpgYByqE2cZtDuRxdoNn3F7ZUQ1T7n58ZOwOMLxLq7FLPGUs3DWXzNc738Dt7+W2i/R+7zT/R/R4NoY3Q9eIMNIf12hPaJ+cXbwuuuKTQnrCSK3Rb6PfDxiMcLVNZL0Qyq0wa3x2AJ3bYMvuwoaD1lj2bPTPAVd5W9q8IJw9CQ49JJt4XXTZx4XOCXorPd+L95ZBPTteWUtkVghzpmQTr6//b4PNP1TrLQjCfKO50gNmApPSiEwLYcIRMGlkdgDL1jVldZhoNFfmgAuSGqwHQnsdd//D7bBxZ6iN4iBcqH97u0G9cUjcsUlol5iU3nIInHN8dgD67leM9bdRzC7S2eC1zP4no52/rlM0mBbCrGNgyOHZxK/dAZ99Z/yI5kCYjGJMC8Jp2EQ1AKH9hGzi9bV0ja/O5kGY2SLCSeHu0QiEtsFwasa1/+NvYX138KlNkyBM0z1gSrjyRiD8dSqUAlbUvp5aHdNG8RCmaADjbJXXA0FfczJ2/0+6Yd32asVNhjBOrwJHxwnOCuHE0TBmRDYASz80ddhEFg+hTc8BZet4rgPCnBOzidfXLeemz+s3/rVN8N/VDUMYrIdAOXZSywDh8FY4qw7np3xY9jLruuHx1dFZvQ4I5ZaAwAYgnDkZBrVmF5P12tELt70N+383YhocDtoV7vNcxFiXNyHOC8+dVrz4ff1w8+vQ84vFFa/Pbe4rIc7pDBqBMGo4TBtbrPj9B2DhG7C9p3qnc4DwY0mEbqvADBDmTg91sQKuhztcdzkgunEIu/Qc8LU50hId7ynnhLYyrN4SHnzGrw+FA0EFJ6foOc+vhxc/DY15T2djS+TX2g/oCmSsA8IdL/haSfFHqpc+4Uh4/G/J4ju3wiMdQWcrRwhdugesj2SssydkdZunj04Wv+UHuOMNOHDAgMsfwnoNoBNbxiZAmDYqXnzPz3Dji7DvV5+bnD+ED0qd97MNYaN18vBqaXCJjKtj+hi7+P79cNMq+L630IcvXyB8UzLxrxGXsSAIY0fA8EFR8Tr5njehq7sOkdkgvKp/e3+KrgwUagKEuLu/9AN4sytYX0EQVvoBvI+wuZkQbADe3gBL3rO3kTOEzVqzDpcqzQiLI4UKhBAG8Pm³cPerwTwFQlhsNPueDeIA2NMMCEcPhSOHVMXv7IObn4Nf+tM/d2gAwh4xN1tf/oejek+wyFooZwjTfd7fz/1w/TOwe1+CgHwhPKi1euneKuAlLnIeIRcMwQNwQODWVbDl+4Q68oWw0wCopFcfjrrfPYTOBRUB4aRxbvR/3oKOjSnqyA/CAoHd/vTAGSFT+H8IHUVBOGKwu31+aS08/X5tkTlC6DDaAun+SdArLOaYzN4iIOi7v+YreOAVSz3FQdgrriYJpwdPiFQhfInwj4i4HCDoBye3POO6u9Z6ioGgtXxpS48el69CWIn7AkSuEF7+CHp/spcrCII+PL0yLt1+XL4KYQHC8jwh9P2UPERyhrDcHJSMhVTpATEQdPQViNks5TwcCoagbb7CG/dxEAKTYAyEfoF5CCsGEARt6zwR+kPDIVImOAckQ7gE4b4BAEHbqG3tt+YJQYgsgwkQdPR1uEdLeg9CCL3aNhGuc61NAOUrH+kBNSBgVocZRTpLdUDQTs7J3myfZYm09oAUEPR++nRnkoFdfyKEXWaiO13E8V1i24iDENsDUkAQ88raJODfiOtjNwmCbutWcdteUpnpa/QUW57qbrA+CJgN1EJgPML1CF0FQugSt43x5s3RnkadJee0+ClXhp7iKPt35KQ4vnLBuBkoLlVwHoqJ1ocmvjJxD05m³GYULyvFUufl6XA9teqISffiqgD8YvKB4MWPQjEThT48o4+mHaf06/OK4cAgFL+h+FEp9gB7nNfnFRuV4jPv9fkYMI1DUPAHyKsksq2mYkAAAAAASUVORK5CYII=",
    ydl_d: "data:img/png;base64,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³t9vil2btj9k7RThEcBOQJET2apn+fh/59vllE6gEsicicAFMQmRJBHyDXRaQbwGURGXUezQ+zA1X0qL8A/wc7FzBPOdYPjgAAAABJRU5ErkJggg==",

    // 用氯量
    yll: "data:img/png;base64,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",
    yll_d: "data:img/png;base64,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³EKBL9wG2/3CLWYeBYNQIHt+6LjSe6L8XHkqHz37VIPxNv2YswuSECPeGp46idcJ/v/waSztabWZLpaV5EX720ydw7cZd3B8cwfT0LGozNWhtzWLNquVofKw+wJAqVc0hesaQ+GjQpMJRlukPc57Qvq2cIHialCsiXJ8GBI3/Pz93EU/9eGuAOBWDTRu6sQndkQy4y+Wve810WlHvu3ejohGo9ETrFSFP629GcfWAR8LFIF4cevvu47PPz2N2tpCI0bCim³/12p1wPyECgnIBVBlxOEKbsdL5AOjxUw5VAsKt3gF89Mm/MZp7kIrx/PQM/vO/qzh/4XqksxRdUuQTvCAoj0ectkxpGUmOgsMCHojfZAwXh8GhHD7857/QuaLDlPP29mZkaoI7RSrrQ8M53Ln7DW7fGcDMTMHKAkVsyOrKmpiYCvQzPT1jM5T6gPefqKfT7TZ55/gH7l3XFgguCdBRfpMxauPUukczvE1NDWhsqDc9xgKBfD6PBw+mbP/eTn9ZO6Lew9gpNmRTHvAegMhmAQadDdkMnWPkFlrDQtlHwVFB1ApI5jFqemxsbML8DwMozQ5Umq35Mithn4CDbsVoOAoFJbl5G8SnjgKqRCeUD6W99XwEUCFtnypvfp1gFHVtCQT9+UUQI98hEEZsnuhXjIY75naBcJXgy6VodMGD8DItngLWwYD7Ri8IJwge/A6AoAe8T0SZSMPFcBgI+wi+t4BBeI/g63F+QpgSdIOgX3cTPLUAQTgFcjdtuY8CwYCX4TAQND79BcHjCwiE47RozpezDiURKA/CCwTfXAAgvEngBZD5JCbSKwLlxeFVgrtAjD6CIIyS3EXgVW1MaB1QzEokBMGxDtseMWdJaXkC5Im0JrL4vkBKEK4QfNZSkLj/EEG4T3I3gGdJXk1hHdxKsERcShC0q2MgNhB4A+pjf3sg6Fi/JbgBNF+bY4xOiAXBJQIVgaBtwyAOEHr8lK/pPsM8gnCBxGskdaz9JIardZaKsUCVIOhHjvrKGriFxJMAD5O4MgcgXCFxGNCXqs1XZw9pNm6unCV56+2TnhPYWiJfNg45sR1os/7c+YNOEWwH5HsiejRNX5+Hvj7fKiJ6zm5aRMYEGILIkAguAfKViJwHcEZEeoOhdKmuKp8gwP8BtzthPp6Sd/gAAAAASUVORK5CYII=",
}