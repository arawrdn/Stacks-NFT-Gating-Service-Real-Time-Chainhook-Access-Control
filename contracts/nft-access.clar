(define-constant CONTRACT-OWNER tx-sender)
(define-constant ERR-NOT-OWNER (err u100))
(define-constant ERR-NOT-AUTHORIZED (err u101))

(define-non-fungible-token nft-access uint)

(define-public (mint (recipient principal) (nft-id uint))
    (begin
        (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
        (nft-mint? nft-access nft-id recipient)
    )
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
    (begin
        (asserts! (is-eq tx-sender sender) ERR-NOT-OWNER)
        (try! (nft-transfer? nft-access token-id sender recipient))

        (ok 
            (print (tuple 
                (event-type "transfer-access-change") 
                (token-id token-id) 
                (new-owner recipient)
                (old-owner sender)
            ))
        )
    )
)

(define-public (get-last-token-id) (ok u10))
(define-read-only (get-token-uri (token-id uint)) (ok none))
(define-read-only (get-owner (token-id uint)) (ok (nft-get-owner? nft-access token-id)))
